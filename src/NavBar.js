class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.switchStyle = this.switchStyle.bind(this);
        this.styles = ['style.css', 'dark-style.css'];
        this.lightModeStyleSheetName = this.styles[0];
        this.darkModeStyleSheetName = this.styles[1];
        this.state = { style: 'style.css' };
    }
    
    setInitialStyleSheet(){
        const themeFromLocalStorage = localStorage.getItem('theme');
        let newStyle;
        if (themeFromLocalStorage) {
            newStyle = themeFromLocalStorage === 'dark' ? this.darkModeStyleSheetName : this.lightModeStyleSheetName;
            this.updateStyleInState(newStyle);
        } else {
            const useDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (useDarkMode) newStyle = this.darkModeStyleSheetName;
            else newStyle = this.lightModeStyleSheetName;
            this.updateStyleInState(newStyle);
        }
        this.setStyle(newStyle);
    }

    componentDidMount() {
        this.setInitialStyleSheet();
    }
    
    switchStyle(){
        try {
            const newStyle = this.state.style === this.lightModeStyleSheetName ? this.darkModeStyleSheetName : this.lightModeStyleSheetName;
            this.updateStyleInState(newStyle);
            const theme = newStyle === this.lightModeStyleSheetName ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
            this.setStyle(newStyle);
        } catch (error) {
            console.error(`localStorage.setItem(key: ${key}, item: ${item}) error:`, error);
        }
    }
    
    updateStyleInState(newStyle) {
        this.setState({ style: newStyle });
    }
    
    setStyle(styleSheetName) {
        const appStyle = document.getElementById('app-style');
        appStyle.setAttribute('href', styleSheetName);
        const styleSwitchButton = document.getElementById('styleSwitchButton');
        styleSwitchButton.innerHTML = styleSheetName === this.darkModeStyleSheetName ? "Switch to Light Mode" : "Switch to Dark Mode";
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