import React, {useState, useContext} from 'react';
import GithubContext from '../../context/github/GithubContext';
import AlertContext  from '../../context/alert/AlertContext';

const Search = () => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);
    const [text, setText] = useState('');

    const onChange = e => setText(e.target.value);

    const onSubmit = (e)  => {
        e.preventDefault();
        if(text === ''){
            alertContext.setAlert('Please enter something', 'light');
        } else{
            githubContext.searchUsers(text);
            setText('');
        }
    };

        return (
            <div>
                <form className="form" onSubmit={onSubmit} >
                    <input 
                        type="text" 
                        name="text" 
                        placeholder="Search Users..." 
                        value={text} 
                        onChange={onChange}
                    />
                    <input type="submit" value="Search" className="btn btn-dark btn-block" 
                        onClick={onSubmit}/> 
                    {githubContext.users.length>0?<input type="submit" value="Clear" className="btn btn-dark btn-block" onClick={githubContext.clearUsers}/>:null}
                </form>
            </div>
        ); 
}

export default Search
