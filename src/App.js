import './App.css';
import * as React from "react";
import InputBlock from './components/InputBlock';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exchangeList: {},
            isLoading: true,
            valueFirst: null,
            valueSecond: null,
            koef1: null,
            koef2: null
        };
        this.writeFirstNumber = this.writeFirstNumber.bind(this);
        this.writeSecondNumber = this.writeSecondNumber.bind(this);
        this.chooseFirstOption = this.chooseFirstOption.bind(this);
        this.chooseSecondOption = this.chooseSecondOption.bind(this);
    }

    componentDidMount() {
        fetch('http://api.exchangeratesapi.io/v1/latest?access_key=5758fe2ac7452cdce10218740ce11021')
            .then(res => res.json())
            .then(response => {
                this.setState({
                    exchangeList: response,
                    isLoading: false,
                    koef1: response.rates.USD,
                    koef2: response.rates.UAH
                });
            })
            .catch(e => console.error(e))
    }

    writeFirstNumber(e) {
        this.setState({
            valueFirst: e.target.value,
            valueSecond: e.target.value * this.state.koef2 / this.state.koef1,
        })
    }

    writeSecondNumber(e) {
        this.setState({
            valueFirst: e.target.value * this.state.koef1 / this.state.koef2,
            valueSecond: e.target.value
        })
    }

    chooseFirstOption(e) {
        const Koef2 = this.state.koef2;
        const Koef1 = e.target.value;
        const Val2 = this.state.valueSecond;
        const Val1 = Koef1 / Koef2 * Val2;
        this.setState({
            koef1: Koef1,
            valueFirst: Val1
        })
    }

    chooseSecondOption(e) {
        const Koef1 = this.state.koef1;
        const Koef2 = e.target.value;
        const Val1 = this.state.valueFirst;
        const Val2 = Koef2 / Koef1 * Val1;
        this.setState({
            koef2: Koef2,
            valueSecond: Val2
        })
    }

    render() {
        const { exchangeList, isLoading, valueFirst, valueSecond, koef1, koef2 } = this.state;
        if(!isLoading) {
            return (
                <>
                    <header className='headExchange'>
                        <div>
                            EUR/UAH: {Math.round(exchangeList.rates.UAH / exchangeList.rates.EUR * 100)/100}
                        </div>
                        <div>
                            USD/UAH: {Math.round(exchangeList.rates.UAH / exchangeList.rates.USD * 100)/100}
                        </div>
                        <div>
                            EUR/USD: {Math.round(exchangeList.rates.USD / exchangeList.rates.EUR * 100)/100}
                        </div>
                    </header>
                    <div className='blockWrapper'>
                        <div className="blockWrapper__exchange">
                            <InputBlock
                                selectFunc={this.chooseFirstOption}
                                inputFunc={this.writeFirstNumber}
                                class='blockWrapper__exchange__first'
                                name='first'
                                value={valueFirst}
                                koef={koef1}
                                eList={exchangeList}
                            />
                            <InputBlock
                                selectFunc={this.chooseSecondOption}
                                inputFunc={this.writeSecondNumber}
                                class='blockWrapper__exchange__second'
                                name='second'
                                value={valueSecond}
                                koef={koef2}
                                eList={exchangeList}
                            />
                        </div>
                    </div>
                </>
            );
        }
    }
}

export default App;
