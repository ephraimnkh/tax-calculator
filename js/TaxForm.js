var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TaxForm = function (_React$Component) {
    _inherits(TaxForm, _React$Component);

    function TaxForm(props) {
        _classCallCheck(this, TaxForm);

        return _possibleConstructorReturn(this, (TaxForm.__proto__ || Object.getPrototypeOf(TaxForm)).call(this, props));
    }

    _createClass(TaxForm, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { className: "mx-4" },
                React.createElement(
                    "h1",
                    null,
                    "Tax Calculator"
                ),
                React.createElement(
                    "div",
                    { className: "row mb-3" },
                    React.createElement(
                        "label",
                        { "for": "income", className: "form-label" },
                        "Enter your income: "
                    ),
                    React.createElement("input", { className: "form-control ms-2 w-25", type: "number", id: "income" })
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "button",
                        { className: "btn btn-primary ms-2 col-1", type: "button", onclick: "calculateTax(); calculateTax2021();" },
                        "Calculate"
                    )
                ),
                React.createElement(
                    "h2",
                    null,
                    "2020 Tax Rates"
                ),
                React.createElement("p", { id: "answer" }),
                React.createElement("p", { id: "monthlyAnswer" }),
                React.createElement(
                    "h2",
                    null,
                    "2021 Tax Rates"
                ),
                React.createElement("p", { id: "answer2021" }),
                React.createElement("p", { id: "monthlyAnswer2021" })
            );
        }
    }]);

    return TaxForm;
}(React.Component);

var formContainer = document.getElementById('tax-form');
var formRoot = ReactDOM.createRoot(formContainer);
formRoot.render(React.createElement(TaxForm, null));