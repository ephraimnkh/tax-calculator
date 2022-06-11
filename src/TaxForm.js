class TaxForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {income: '', age: '', taxYear: 2023, monthOrYear: 'month', taxMessage: ''};
        this.handleIncomeChange = this.handleIncomeChange.bind(this);
        this.handleMonthOrYearChange = this.handleMonthOrYearChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleTaxYearChange = this.handleTaxYearChange.bind(this);
        this.calculate = this.calculate.bind(this);
    }

    handleIncomeChange(e) {
        this.setState({income: e.target.value});
    }
    
    handleMonthOrYearChange(e) {
        this.setState({monthOrYear: e.target.value});
    }
    
    handleAgeChange(e) {
        this.setState({age: e.target.value});
    }
    
    handleTaxYearChange(e) {
        this.setState({taxYear: parseInt(e.target.value)});
    }

    calculate() {
        fetch('http://localhost:8080/calculate-tax', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                income: this.state.income,
                monthOrYear: this.state.monthOrYear,
                age: this.state.age,
                taxYear: this.state.taxYear
            })
        })
        .then(res => res.json())
        .then(res => {
            this.setState({ taxMessage: res.message });
        })
        .catch(error => {
            alert(`Error will using node server for calculating tax: ${error}`);
        });
    }

    render(){
        let taxMessageComponent = "";
        // console.log(this.state.taxMessage);
        // console.log(this.state.taxMessage.length > 0);
        let noTax = "Bruh, lucky you, you don't need to pay any tax";
        let taxComponent;
        if (this.state.taxMessage.monthOrYear === 'month' || this.state.taxMessage.monthOrYear === 'year') {
            taxComponent = (
                <div>
                    <h2>Take home pay:</h2>
                    <h1>{this.state.taxMessage.takeHome}</h1>
                    <h2>Yearly Tax:</h2>
                    <h1>R{this.state.taxMessage.yearlyTax}</h1>
                </div>
            );
        } else {
            taxComponent = noTax;
        }

        let monthlyTaxComponent;
        if (this.state.taxMessage.monthOrYear === 'month') monthlyTaxComponent = (
            <div>
                <h2>Monthly Tax:</h2>
                <h1>R{this.state.taxMessage.monthlyTax}</h1>
            </div>
        );
        if (this.state.taxMessage){
            taxMessageComponent = (
            <div className="mt-3">
                {taxComponent}
                {monthlyTaxComponent}
            </div>);
        }
        return (
            <div className="row">
                <div className="col-4">
                    <form className="mx-4">
                        <h3>SARS Income Tax Calculator</h3>
                        <div className="row mb-3">
                            <label htmlFor="income" className="form-label">Enter your income: </label>
                            <input className="form-control ms-2 w-75" type="number" id="income" name="income"  value={this.state.income} onChange={this.handleIncomeChange}/>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="income" className="form-label">Is the specified income for a month or a year?</label>
                            <select className="form-select ms-2 w-75" name="monthOrYear" id="monthOrYear" value={this.state.monthOrYear} onChange={this.handleMonthOrYearChange}>
                                <option value="month">month</option>
                                <option value="year">year</option>
                            </select>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="income" className="form-label">Enter your age: </label>
                            <input className="form-control ms-2 w-75" type="number" id="age" name="age"  value={this.state.age} onChange={this.handleAgeChange}/>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="income" className="form-label">Pick a tax year: </label>
                            <select className="form-select ms-2 w-75" name="taxYear" id="taxYear"  value={this.state.taxYear} onChange={this.handleTaxYearChange}>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                            </select>
                        </div>
                        <button className="btn btn-primary" type="button" onClick={this.calculate}>Calculate Tax</button>
                    </form>
                </div>
                <div className="col-8">
                    {taxMessageComponent}
                </div>
            </div>
        );
    }
}

const formContainer = document.getElementById('tax-form');
const formRoot = ReactDOM.createRoot(formContainer);
formRoot.render(<TaxForm/>);