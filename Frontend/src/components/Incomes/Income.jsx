import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import bg from '../../img/bg.png';
import { createIncomeData, getIncomeCategories } from '../../services/Income-service';
import { bitcoin } from '../../utils/Icon';
import { getCurrentUser } from '../../jwtAuth/auth';
import { toast } from 'react-toastify';
import { getAllIncomes } from '../../services/Income-service';

const Income = () => {
    const style = {
        backgroundImage: `url(${bg})`,
    };

    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(undefined);
    const [incomes, setIncomes] = useState({
        source: '',
        amount: '',
        date: '',
        category: ''
    });
    const [totalIncome, setTotalIncome] = useState(0);
    const [active, setActive] = useState(1); // Default active menu item

    useEffect(() => {
        getIncomeCategories()
            .then((data) => {
                // console.log(data);
                const categoriesObjects = data.map((name, index) => ({
                    id: index + 1,
                    name: name
                }));
                setCategories(categoriesObjects);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);

    // useEffect(() => {
    //     getAllIncomes().then((data)=>{
    //         console.log(data)
    //     }).catch(error=>{
    //         console.log(error)
    //     })
    // }, [])
    

    const fieldChanged = (event, field) => {
        setIncomes({ ...incomes, [field]: event.target.value });
    };

    const createIncome = (event) => {
        event.preventDefault();
        if (!user) {
            alert("User not loaded");
            return;
        }
        incomes['userId'] = user.id;
        createIncomeData(incomes)
            .then(data => {
                toast.success("Income Created !! ")
                setIncomes({
                    source: '',
                    amount: '',
                    date: '',
                    category: ''
                })
            })
            .catch((error) => {
                toast.error("Error Occured !! ")
                console.error("Create Income Error:", error.response || error.message);
            });
    };

    return (
        <div style={style} className="flex">
            <Navigation active={active} setActive={setActive} />
            <div style={{ backgroundColor: 'rgba(252, 246, 249, 0.78)' }} className="flex-1 h-[94vh] rounded-2xl flex flex-col ml-2 mr-8 p-8 my-auto">
                <div className="flex flex-col">
                    {/* {JSON.stringify(incomes)} */}
                    <h2 className="text-3xl font-bold mb-1">Incomes</h2>
                    <h2 className="total-income flex justify-center items-center p-4  mt-2 mb-4 mx-0 bg-[#fcf6f9] border-2 border-white shadow-[0px_1px_15px_rgba(0,0,0,0.06)] rounded-[20px] text-2xl gap-2">
                        Total Income: <span className="text-2.5xl font-extrabold text-green-500">${totalIncome}</span>
                    </h2>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-1/4">
                            <form onSubmit={createIncome} className="space-y-4">
                                <div>
                                    <label className="block  font-medium mb-1">
                                        <input
                                            type="text"
                                            value={incomes.source}
                                            onChange={(e) => fieldChanged(e, 'source')}
                                            required
                                            className=" w-full border border-gray-300 rounded-lg p-2"
                                            placeholder='Income description'
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label className="block font-medium  mb-1">
                                        <input
                                            type="number"
                                            value={incomes.amount}
                                            onChange={(e) => fieldChanged(e, 'amount')}
                                            required
                                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                                            placeholder='Amount'
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">
                                        <input
                                            type="date"
                                            value={incomes.date}
                                            onChange={(e) => fieldChanged(e, 'date')}
                                            required
                                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                                            placeholder='Enter a date'
                                        />
                                    </label>
                                </div>
                                <div className=''>
                                    <label className="block font-medium mb-1">
                                        <select
                                            value={incomes.category}
                                            onChange={(e) => fieldChanged(e, 'category')}
                                            required
                                            className="mt-1  block w-2/3 border border-gray-300 rounded-lg p-2"
                                            placeholder='Enter Category'
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.name}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                    Add Income
                                </button>
                            </form>
                        </div>
                        <div className="w-full md:w-3/4">
                            {incomes.length > 0 ? (
                                <ul className="space-y-4">
                                    {incomes.map((income) => (
                                        <li key={income.id} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="bg-blue-100 rounded-full p-2 mr-4">
                                                    {bitcoin}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg">{income.source}</h3>
                                                    <p className="text-gray-500 text-sm">{income.date}</p>
                                                    <p className="text-gray-600">{income.description || 'No description provided.'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="font-bold text-lg mr-4">${income.amount}</span>
                                                <button className="text-red-500 hover:text-red-700">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No incomes to display.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Income;
