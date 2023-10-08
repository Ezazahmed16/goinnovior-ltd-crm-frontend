import React from 'react'

const InvoiceItems = () => {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-xl'>
                            <th>Item</th>
                            <th className='text-center'>Description</th>
                            <th className='text-center bg-green-500'>Unit Price</th>
                            <th className='text-center bg-green-500'>Quantity</th>
                            <th className='text-center bg-green-500'>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* row 1 */}
                        <tr className=''>
                            <td>Microsoft Office Basic 365 Business basic Licence</td>
                            <td className='text-center'>Monthly Subscription <br />
                                01-Sep-2023 - 30-Sep-2023</td>
                            <td className='text-center'>450</td>
                            <td className='text-center'>7</td>
                            <td className='text-center'>3150</td>
                        </tr>

                        {/* row 2 */}
                        <tr>
                            <td>Microsoft Office Basic 365 Business basic Licence</td>
                            <td className='text-center'>Monthly Subscription <br />
                                01-Sep-2023 - 30-Sep-2023</td>
                            <td className='text-center'>450</td>
                            <td className='text-center'>7</td>
                            <td className='text-center'>3150</td>
                        </tr>

                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th className='text-center'>SUB TOTAL</th>
                            <td className='text-center'>3150</td>
                        </tr>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th className='text-center'>VAT</th>
                            <td className='text-center'>00</td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th className='text-center'>Discount</th>
                            <td className='text-center'>00</td>
                        </tr>
                        </tbody>

                        <tfoot>
                            <tr className='text-xl '>
                                <th></th>
                                <th className='text-center'>In Word: Three Thousand One Hundred</th>
                                <th className='text-center'></th>
                                <th className='text-center bg-green-500'>Total Payable</th>
                                <th className='text-center bg-green-500'>3101</th>
                            </tr>
                        </tfoot>

                </table>


            </div>
        </div>
    )
}

export default InvoiceItems