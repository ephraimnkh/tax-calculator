class TaxForm extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <form className="mx-4">
                <h1>Tax Calculator</h1>
                <div className="row mb-3">
                    <label for="income" className="form-label">Enter your income: </label>
                    <input className="form-control ms-2 w-25" type="number" id="income"/>
                </div>
                <div className="row">
                    <button className="btn btn-primary ms-2 col-1" type="button" onclick="calculateTax(); calculateTax2021();">Calculate</button>
                </div>
                <h2>2020 Tax Rates</h2>
                <p id="answer"></p>
                <p id="monthlyAnswer"></p>
                <h2>2021 Tax Rates</h2>
                <p id="answer2021"></p>
                <p id="monthlyAnswer2021"></p>
            </form>
        );
    }
}

const formContainer = document.getElementById('tax-form');
const formRoot = ReactDOM.createRoot(formContainer);
formRoot.render(<TaxForm/>);