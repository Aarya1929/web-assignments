import React, { useState } from 'react';
import axios from 'axios';
import './Result.css';

function Result() {
    // State to hold form values
    const [values, setValues] = useState({
        prn: '',
        name: '',
        subject1mse: '',
        subject1ese: '',
        subject2mse: '',
        subject2ese: '',
        subject3mse: '',
        subject3ese: '',
        subject4mse: '',
        subject4ese: '',
        percentage: ''
    });

    // Handle input changes and update state
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    // Handle calculating percentage
   const handleCalculatePercentage = () => {
    const weightedAverages = [
        (values.subject1mse * 0.3) + (values.subject1ese * 0.7),
        (values.subject2mse * 0.3) + (values.subject2ese * 0.7),
        (values.subject3mse * 0.3) + (values.subject3ese * 0.7),
        (values.subject4mse * 0.3) + (values.subject4ese * 0.7)
    ];

    const finalPercentage = weightedAverages.reduce((sum, avg) => sum + avg, 0) / 4;

    setValues({ ...values, percentage: finalPercentage.toFixed(2) });
};


    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Send the data (including percentage) to the backend
        axios.post('http://localhost:5000/result', values)
            .then(() => {
                console.log('Data submitted successfully!');
                // You can perform additional actions after successful submission, if desired
            })
            .catch(err => console.error('Error submitting data:', err));
    };

    // Render the form
    return (
        <div className="result-container">
            <div className="form-container">
                <h2 className="text-center">VIT SEMESTER RESULT</h2>
                <form onSubmit={handleSubmit}>
                    {/* PRN input */}
                    <div className="mb-3">
                        <label htmlFor="prn"><strong>PRN</strong></label>
                        <input
                            type="number"
                            min="10000000"
                            max="99999999"
                            step="1"
                            placeholder="Enter PRN"
                            name="prn"
                            className="form-control rounded-0"
                            onChange={handleChange}
                            value={values.prn}
                        />
                    </div>

                    {/* Student name input */}
                    <div className="mb-3">
                        <label htmlFor="name"><strong>NAME</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Student Name"
                            name="name"
                            className="form-control rounded-0"
                            onChange={handleChange}
                            value={values.name}
                        />
                    </div>

                    {/* Input fields for each subject's MSE and ESE marks */}
                    {['1', '2', '3', '4'].map(subject => (
                        <React.Fragment key={subject}>
                            {/* MSE marks */}
                            <div className="mb-3">
                                <label htmlFor={`subject${subject}mse`}>
                                    <strong>SUBJECT {subject} - MSE MARKS</strong>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    placeholder={`Enter Subject ${subject} MSE Marks`}
                                    name={`subject${subject}mse`}
                                    className="form-control rounded-0"
                                    onChange={handleChange}
                                    value={values[`subject${subject}mse`]}
                                />
                            </div>

                            {/* ESE marks */}
                            <div className="mb-3">
                                <label htmlFor={`subject${subject}ese`}>
                                    <strong>SUBJECT {subject} - ESE MARKS</strong>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    placeholder={`Enter Subject ${subject} ESE Marks`}
                                    name={`subject${subject}ese`}
                                    className="form-control rounded-0"
                                    onChange={handleChange}
                                    value={values[`subject${subject}ese`]}
                                />
                            </div>
                        </React.Fragment>
                    ))}

                    {/* Button to calculate percentage */}
                    <button
                        type="button"
                        className="btn btn-info w-100 rounded-0 mt-2"
                        onClick={handleCalculatePercentage}
                    >
                        Calculate Percentage
                    </button>

                    {/* Display calculated percentage */}
                    {values.percentage && (
                        <div className="result-display" name="percentage">
                            <h3>Calculated Percentage: {values.percentage}%</h3>
                        </div>
                    )}

                     {/* Submit button */}
                    <button
                        type="submit"
                        className="btn btn-success w-100 rounded-0 mt-2"
                    >
                        Submit Data
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Result;
