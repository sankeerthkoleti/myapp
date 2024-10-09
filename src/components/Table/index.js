import "./index.css"
let Table = (props)=>{
    console.log(props);
    let {list,changeid} = props;
    const userItem = item => {
        const {id, name, email} = item
        let change = ()=>{
            changeid(id);
        }
        return (
          <li>
            <button onClick={change} className="table-row">
                <p className="userItem-text">{id}</p>
                <p className="userItem-text">{name}</p>
                <p className="userItem-text">{email}</p>
            </button>
          </li>
        )
    }
    
    return(
        <ul className="ttable">
            <li className="table-header">
                <p className="table-header-cell">ID</p>
                <p className="table-header-cell">NAME</p>
                <p className="table-header-cell">EMAIL</p>
            </li>
            {list.map(eachUser => (
              userItem(eachUser)
            ))}
        </ul>
    )
}
export default Table