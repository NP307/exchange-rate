import * as React from "react";

class InputBlock extends React.Component {
    render() {
        return (
            <div className={this.props.class}>

                <input type="number" name={this.props.name} value={this.props.value} onChange={this.props.inputFunc} step="0.01"/>

                <select value={this.props.koef} onChange={this.props.selectFunc}>
                    <option value={this.props.eList.rates.UAH}>UAH</option>
                    <option value={this.props.eList.rates.USD}>USD</option>
                    <option value={this.props.eList.rates.EUR}>EUR</option>
                </select>

            </div>
        );
    }
}

export default InputBlock;
