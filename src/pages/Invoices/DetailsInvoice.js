import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineDownload } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import logo from '../../assets/logo.png'
import { BiSolidPhoneCall } from 'react-icons/bi';
import { BsFillCursorFill } from 'react-icons/bs';
import { ImLocation2 } from 'react-icons/im';

const InvoiceDetails = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const componentRef = useRef();

    useEffect(() => {
        // Fetch invoice details using id
        const fetchInvoiceDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/invoices/${id}`);

                if (response.ok) {
                    const data = await response.json();
                    setInvoice(data);
                    setLoading(false);
                } else {
                    setError('Error fetching invoice details');
                    setLoading(false);
                }
            } catch (error) {
                setError('Error fetching invoice details');
                setLoading(false);
            }
        };

        fetchInvoiceDetails();
    }, [id]);

    if (loading) {
        return <div></div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!invoice) {
        return <div>Invoice not found</div>;
    }

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Calculate the subtotal
    const calculateSubtotal = () => {
        return invoice.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
    };

    // Calculate the VAT (assuming a 20% VAT rate)
    const calculateVAT = () => {
        // const subtotal = calculateSubtotal();
        // return subtotal * 0.2;
        const subtotal = 0;
        return subtotal;
    };

    // Calculate the total payable
    const calculateTotalPayable = () => {
        return calculateSubtotal() + calculateVAT();
    };

    // Function to convert a number to words
    const numberToWords = (num) => {
        // Define arrays for word representation
        const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        const thousands = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

        // Function to convert less than 1000 to words
        const convertLessThanOneThousand = (num) => {
            if (num === 0) {
                return '';
            } else if (num < 10) {
                return units[num];
            } else if (num < 20) {
                return teens[num - 10];
            } else if (num < 100) {
                const ten = Math.floor(num / 10);
                const remainder = num % 10;
                return tens[ten] + ' ' + units[remainder];
            } else {
                const hundred = Math.floor(num / 100);
                const remainder = num % 100;
                return units[hundred] + ' Hundred ' + convertLessThanOneThousand(remainder);
            }
        };

        // Function to convert a number to words
        const convertToWords = (num) => {
            if (num === 0) {
                return 'Zero';
            }

            let words = '';
            let i = 0;

            while (num > 0) {
                if (num % 1000 !== 0) {
                    words = convertLessThanOneThousand(num % 1000) + ' ' + thousands[i] + ' ' + words;
                }
                num = Math.floor(num / 1000);
                i++;
            }

            return words.trim();
        };

        return convertToWords(num);
    };

    // Get the total payable in words
    const totalPayableInWords = numberToWords(calculateTotalPayable());

    console.log(invoice)
    return (
        <div className='h-screen'>
            <div className="text-right m-10">
                <ReactToPrint
                    trigger={() => (
                        <div className="w-full justify-end mr-auto">
                            <button className='btn btn-primary btn-outline btn-sm'>
                                Download <AiOutlineDownload></AiOutlineDownload>
                            </button>
                        </div>
                    )}
                    content={() => componentRef.current}
                />
            </div>

            <div ref={componentRef}>
                <div className="px-3 bg-main-bg rounded-3xl">
                    <div className="flex justify-end">
                        <img className='w-40' src={logo} alt="" />
                    </div>
                    <div className="flex justify-start">
                        <h2 className='text-2xl font-bold'>Invoice</h2>
                    </div>
                    <div className="flex justify-end">
                        <div className="overflow-x-auto w-fit">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>Invoice Number</td>
                                        <td>Date</td>
                                    </tr>
                                    <tr>
                                        <td>{invoice.invoiceNumber}</td>
                                        <td>{formatDate(invoice.date)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5 ">
                        <div className="">
                            <h1>Company details..</h1>
                            <h1>Details Comming soon</h1>
                        </div>
                        <div className="">
                            <div className="overflow-x-auto w-full font-semibold">
                                <table className="table bg-green-500 ">
                                    <tbody>
                                        <tr>
                                            <td>Payment Term: </td>
                                            <td>{invoice.paymentTerm}</td>
                                        </tr>
                                        <tr>
                                            <td>PO Referrence: </td>
                                            <td>{invoice.poReference}</td>
                                        </tr>
                                        <tr>
                                            <td>Due Within: </td>
                                            <td>{formatDate(invoice.dueWithin)}</td>
                                        </tr>
                                        <tr>
                                            <td>Billing Period: </td>
                                            <td>{
                                                formatDate(invoice.billingPeriod.startDate)
                                            } - {
                                                    formatDate(invoice.billingPeriod.endDate)
                                                }</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Item Table */}
                    <div className="">
                        <div className="overflow-x-auto my-5">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr className='font-semibold text-lg'>
                                        <th className='w-3'></th>
                                        <th className='bg-base-200 w-64'>Item</th>
                                        <th className='bg-base-200 w-52'>Description</th>
                                        <th className='bg-green-500 '>Unit Price</th>
                                        <th className='bg-green-500 '>Quantity</th>
                                        <th className='bg-green-500 '>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        invoice?.items.map((item, index) =>
                                            <tr key={index} className="">
                                                <th className='w-fit'> {index + 1} </th>
                                                <td>{item.itemName}</td>
                                                <td>{item.description}</td>
                                                <td>{item.unitPrice}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.unitPrice * item.quantity}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                                <tfoot className='my-5'>
                                    <tr className="">
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th className='text-sm uppercase'>Subtotal</th>
                                        <td>{calculateSubtotal().toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th className='text-sm uppercase'>VAT (00%)</th>
                                        <td>{calculateVAT().toFixed(2)}</td>
                                    </tr>
                                    <tr className='border border-y-1'>
                                        <th></th>
                                        <th></th>
                                        <th className='text-end uppercase font-bold'>In Word:</th>
                                        <th>{totalPayableInWords}</th>
                                        <th className='text-sm uppercase bg-green-500'>Total Payable</th>
                                        <td className=' bg-green-500'>{calculateTotalPayable().toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    {/* Terms & Condition  */}
                    <div className="my-5 px-5">
                        <div className="">
                            <h1 className='text-xl' style={{ color: '#578B73' }}>Terms & <span style={{ color: '#C2F591' }}>Conditions</span></h1>
                        </div>
                        <div className="">
                            {
                                invoice?.termsAndConditions.map(terms => <>
                                    <p className='font-bold'>{terms}</p>
                                </>)
                            }
                        </div>
                    </div>

                    <div className="mb-5">
                        {/* Signature */}
                        <div className="grid grid-cols-2 items-center">
                            <div className="">
                                <h1 className='text-lg font-bold border-1 p-2'>Authorized Signature</h1>
                            </div>
                            <div className="bg-green-500 p-2">
                                <h1 className='text-lg font-bold'>Received in Good Condition</h1>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 m-2">
                            <div className="flex items-center">
                                <div className="">
                                    <BiSolidPhoneCall className='h-6 w-6' />
                                </div>
                                <div className="">
                                    +8801844-185480
                                    <br />
                                    +8801844-185485
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="">
                                    <BsFillCursorFill className='h-6 w-6' />
                                </div>
                                <div className="">
                                    https://www.goinnovior.com/
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="">
                                    <ImLocation2 className='h-6 w-6' />
                                </div>
                                <div className="">
                                    House-774, Road-11, Avenue-02
                                    <br />
                                    Mirpur, DOHS, Dhaka - 1216, BD
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 m-2">
                            <div className='h-2' style={{ backgroundColor: '#4D8171' }}></div>
                            <div className='h-2' style={{ backgroundColor: '#4DA178' }}></div>
                            <div className='h-2' style={{ backgroundColor: '#7FD372' }}></div>
                            <div className='h-2' style={{ backgroundColor: '#D2EA58' }}></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default InvoiceDetails;
