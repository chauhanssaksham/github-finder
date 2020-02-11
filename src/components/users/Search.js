import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {

    state= {
        text: ''
    }
    
    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        usersLength: PropTypes.number.isRequired
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    onSubmit = (e)  => {
        e.preventDefault();
        this.props.searchUsers(this.state.text);
        this.setState({ text: '' });
    };
    onClear = (e) => {
        e.preventDefault();
        this.props.clearUsers();
    }
    render() {
        return (
            <div>
                <form className="form" onSubmit={this.onSubmit} >
                    <input 
                        type="text" 
                        name="text" 
                        placeholder="Search Users..." 
                        value={this.state.text } 
                        onChange={this.onChange}
                    />
                    <input type="submit" value="Search" className="btn btn-dark btn-block" 
                        onClick={this.onSubmit}/> 
                    {this.props.usersLength>0?<input type="submit" value="Clear" className="btn btn-dark btn-block" onClick={this.onClear}/>:null}
                </form>
            </div>
        )
    }
}

export default Search
