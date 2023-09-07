

    return (
        <div className='m-2 md:m-10 mt-24 p-2 md:p-2 bg-main-bg rounded-3xl'>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="underline" style={{ color: currentColor }}>
                    <Link className='flex' to='/marketing/leads'>
                        <RiArrowGoBackLine className='w-6 h-6 mx-2' />
                        Go Back
                    </Link>
                </div>
                <h3 className="font-bold text-2xl mb-2 text-center">Add a new lead</h3>
                <div className="divider"></div>

                {/* ... Rest of your form code ... */}

                {/* Company's Address */}
                
                    </div>
                </div>

                {/* ... Rest of your form code ... */}

                {/* Add */}
                <div className="flex justify-center mt-10">
                    <button
                        style={{ backgroundColor: currentColor }}
                        type="submit"
                        className="btn"
                    >
                        <GrAdd className="w-4 h-4" />
                        Add Lead
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewLead;
