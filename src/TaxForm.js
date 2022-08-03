class TaxForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {income: '', age: '', taxYear: 2023, monthOrYear: 'month', taxObject: '', years: []};
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

    componentDidMount() {
        fetch('http://localhost:8080/tax-years')
        .then(res => res.json())
        .then(res => {
            this.setState({ years: res.taxYears });
        })
        .catch(error => {
            alert(`Error will using node server for calculating tax: ${error}`);
        });
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
            this.setState({ taxObject: res.message });
        })
        .catch(error => {
            alert(`Error will using node server for calculating tax: ${error}`);
        });
    }

    render(){
        let taxMessageComponent = "";
        const noTax = (<div><h2>Lucky you, you don't need to pay any tax</h2></div>);
        let taxComponent;
        if (this.state.taxObject.monthlyTax > 0 && this.state.taxObject.yearlyTax > 0) {
            taxComponent = (
                <div>
                    <h2>Take home pay <span> = Monthly Income - Monthly Tax</span>:</h2>
                    <h1>{this.state.taxObject.takeHome}</h1>
                </div>
            );
        } else {
            taxComponent = noTax;
        }

        const monthlyTaxComponent = (
            <div>
                <h2>Monthly Tax:</h2>
                <h1>R{this.state.taxObject.monthlyTax}</h1>
            </div>
        );
        const yearlyTaxComponent = (
            <div>
                <h2>Yearly Tax:</h2>
                <h1>R{this.state.taxObject.yearlyTax}</h1>
            </div>
        );

        const disclaimer = `Your actual take home may vary based on other deductions like UIF, Medical Aid etc.`;
        if (this.state.taxObject){
            if (this.state.taxObject.monthlyTax > 0 && this.state.taxObject.yearlyTax > 0) {
                taxMessageComponent = (
                <div className="mt-3">
                    {taxComponent}
                    {monthlyTaxComponent}
                    {yearlyTaxComponent}
                    <div className="text-secondary text-small">
                        {disclaimer}
                    </div>
                </div>);
            } else {
                taxMessageComponent = (
                <div className="mt-3">
                    {taxComponent}
                </div>);
            }
        }
        const taxYears = this.state.years;
        return (
            <div className="row">
                <div className="col-lg-4 col-md-6">
                    <form className="mx-4">
                        <h3>SARS Income Tax Calculator</h3>
                        <div className="row mb-3">
                            <label htmlFor="income" className="form-label">Enter your income:</label>
                            <input className="form-control ms-2" type="number" id="income" name="income"  value={this.state.income} onChange={this.handleIncomeChange}/>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="income" className="form-label">Is the specified income for a month or a year?</label>
                            <select className="form-select ms-2" name="monthOrYear" id="monthOrYear" value={this.state.monthOrYear} onChange={this.handleMonthOrYearChange}>
                                <option value="month">month</option>
                                <option value="year">year</option>
                            </select>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="income" className="form-label">Enter your age:</label>
                            <input className="form-control ms-2" type="number" id="age" name="age"  value={this.state.age} onChange={this.handleAgeChange}/>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="income" className="form-label">Pick a tax year:</label>
                            <select className="form-select ms-2" name="taxYear" id="taxYear"  value={this.state.taxYear} onChange={this.handleTaxYearChange}>
                                {taxYears.map((year) => {
                                    return <option key={year} value={year}>{year}</option>
                                })}
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