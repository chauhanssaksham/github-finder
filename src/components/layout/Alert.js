import React, {useContext} from 'react'
import AlertState from '../../context/alert/AlertContext'

const Alert = () => {
    const alertContext= useContext(AlertState);
    const {alert} = alertContext;
    return (
        alert !== null && (
            <div className={`alert-${alert.type}`}>
                <i className="fas fa-info-circle"/> {alert.msg}
            </div>
        )
    )
}

export default Alert