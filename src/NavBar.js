class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = { style: 'style.css' }
        this.switchStyle = this.switchStyle.bind(this);
        this.styles = ['style.css', 'dark-style.css'];
    }

    switchStyle(){
        let newStyle = this.state.style === this.styles[0] ? this.styles[1] : this.styles[0];
        this.setState({style: newStyle});
        let appStyle = document.getElementById('app-style');
        appStyle.setAttribute('href', newStyle);
        let styleSwitchButton = document.getElementById('styleSwitchButton');
        styleSwitchButton.innerHTML = this.state.style === this.styles[0] ? "Switch to Light Mode" : "Switch to Dark Mode";
    }

    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Tax Calculator</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#" id="styleSwitchButton" onClick={this.switchStyle}>Switch to Dark Mode</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

const navbarContainer = document.getElementById('navbar');
const navbarRoot = ReactDOM.createRoot(navbarContainer);
navbarRoot.render(<NavBar/>);