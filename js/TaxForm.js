var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TaxForm = function (_React$Component) {
    _inherits(TaxForm, _React$Component);

    function TaxForm(props) {
        _classCallCheck(this, TaxForm);

        var _this = _possibleConstructorReturn(this, (TaxForm.__proto__ || Object.getPrototypeOf(TaxForm)).call(this, props));

        _this.state = { income: '', age: '', taxYear: 2023, monthOrYear: 'month', taxObject: '', years: [] };
        _this.handleIncomeChange = _this.handleIncomeChange.bind(_this);
        _this.handleMonthOrYearChange = _this.handleMonthOrYearChange.bind(_this);
        _this.handleAgeChange = _this.handleAgeChange.bind(_this);
        _this.handleTaxYearChange = _this.handleTaxYearChange.bind(_this);
        _this.calculate = _this.calculate.bind(_this);
        return _this;
    }

    _createClass(TaxForm, [{
        key: 'handleIncomeChange',
        value: function handleIncomeChange(e) {
            this.setState({ income: e.target.value });
        }
    }, {
        key: 'handleMonthOrYearChange',
        value: function handleMonthOrYearChange(e) {
            this.setState({ monthOrYear: e.target.value });
        }
    }, {
        key: 'handleAgeChange',
        value: function handleAgeChange(e) {
            this.setState({ age: e.target.value });
        }
    }, {
        key: 'handleTaxYearChange',
        value: function handleTaxYearChange(e) {
            this.setState({ taxYear: parseInt(e.target.value) });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            fetch('http://localhost:8080/tax-years').then(function (res) {
                return res.json();
            }).then(function (res) {
                _this2.setState({ years: res.taxYears });
            }).catch(function (error) {
                alert('Error will using node server for calculating tax: ' + error);
            });
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            var _this3 = this;

            fetch('http://localhost:8080/calculate-tax', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    income: this.state.income,
                    monthOrYear: this.state.monthOrYear,
                    age: this.state.age,
                    taxYear: this.state.taxYear
                })
            }).then(function (res) {
                return res.json();
            }).then(function (res) {
                _this3.setState({ taxObject: res.message });
            }).catch(function (error) {
                alert('Error will using node server for calculating tax: ' + error);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var taxMessageComponent = "";
            var noTax = React.createElement(
                'div',
                null,
                React.createElement(
                    'h2',
                    null,
                    'Lucky you, you don\'t need to pay any tax'
                )
            );
            var taxComponent = void 0;
            if (this.state.taxObject.monthlyTax > 0 && this.state.taxObject.yearlyTax > 0) {
                taxComponent = React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h2',
                        null,
                        'Take home pay ',
                        React.createElement(
                            'span',
                            null,
                            ' = Monthly Income - Monthly Tax'
                        ),
                        ':'
                    ),
                    React.createElement(
                        'h1',
                        null,
                        this.state.taxObject.takeHome
                    )
                );
            } else {
                taxComponent = noTax;
            }

            var monthlyTaxComponent = React.createElement(
                'div',
                null,
                React.createElement(
                    'h2',
                    null,
                    'Monthly Tax:'
                ),
                React.createElement(
                    'h1',
                    null,
                    'R',
                    this.state.taxObject.monthlyTax
                )
            );
            var yearlyTaxComponent = React.createElement(
                'div',
                null,
                React.createElement(
                    'h2',
                    null,
                    'Yearly Tax:'
                ),
                React.createElement(
                    'h1',
                    null,
                    'R',
                    this.state.taxObject.yearlyTax
                )
            );

            var disclaimer = 'Your actual take home may vary based on other deductions like UIF, Medical Aid etc.';
            if (this.state.taxObject) {
                if (this.state.taxObject.monthlyTax > 0 && this.state.taxObject.yearlyTax > 0) {
                    taxMessageComponent = React.createElement(
                        'div',
                        { className: 'mt-3' },
                        taxComponent,
                        monthlyTaxComponent,
                        yearlyTaxComponent,
                        React.createElement(
                            'div',
                            { className: 'text-secondary text-small' },
                            disclaimer
                        )
                    );
                } else {
                    taxMessageComponent = React.createElement(
                        'div',
                        { className: 'mt-3' },
                        taxComponent
                    );
                }
            }
            var taxYears = this.state.years;
            return React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-lg-4 col-md-6' },
                    React.createElement(
                        'form',
                        { className: 'mx-4' },
                        React.createElement(
                            'h3',
                            null,
                            'SARS Income Tax Calculator'
                        ),
                        React.createElement(
                            'div',
                            { className: 'row mb-3' },
                            React.createElement(
                                'label',
                                { htmlFor: 'income', className: 'form-label' },
                                'Enter your income:'
                            ),
                            React.createElement('input', { className: 'form-control ms-2', type: 'number', id: 'income', name: 'income', value: this.state.income, onChange: this.handleIncomeChange })
                        ),
                        React.createElement(
                            'div',
                            { className: 'row mb-3' },
                            React.createElement(
                                'label',
                                { htmlFor: 'income', className: 'form-label' },
                                'Is the specified income for a month or a year?'
                            ),
                            React.createElement(
                                'select',
                                { className: 'form-select ms-2', name: 'monthOrYear', id: 'monthOrYear', value: this.state.monthOrYear, onChange: this.handleMonthOrYearChange },
                                React.createElement(
                                    'option',
                                    { value: 'month' },
                                    'month'
                                ),
                                React.createElement(
                                    'option',
                                    { value: 'year' },
                                    'year'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'row mb-3' },
                            React.createElement(
                                'label',
                                { htmlFor: 'income', className: 'form-label' },
                                'Enter your age:'
                            ),
                            React.createElement('input', { className: 'form-control ms-2', type: 'number', id: 'age', name: 'age', value: this.state.age, onChange: this.handleAgeChange })
                        ),
                        React.createElement(
                            'div',
                            { className: 'row mb-3' },
                            React.createElement(
                                'label',
                                { htmlFor: 'income', className: 'form-label' },
                                'Pick a tax year:'
                            ),
                            React.createElement(
                                'select',
                                { className: 'form-select ms-2', name: 'taxYear', id: 'taxYear', value: this.state.taxYear, onChange: this.handleTaxYearChange },
                                taxYears.map(function (year) {
                                    return React.createElement(
                                        'option',
                                        { key: year, value: year },
                                        year
                                    );
                                })
                            )
                        ),
                        React.createElement(
                            'button',
                            { className: 'btn btn-primary', type: 'button', onClick: this.calculate },
                            'Calculate Tax'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-8' },
                    taxMessageComponent
                )
            );
        }
    }]);

    return TaxForm;
}(React.Component);

var formContainer = document.getElementById('tax-form');
var formRoot = ReactDOM.createRoot(formContainer);
formRoot.render(React.createElement(TaxForm, null));