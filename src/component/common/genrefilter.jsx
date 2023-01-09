import React from 'react'

const GenreFilter = ({ items, textProperty, valueProperty, onItemSelect, selectedItem }) => {

    return (
        <div className="list-group">
            {items.map(item => <li key={item[valueProperty]} onClick={() => onItemSelect(item)} className={item === selectedItem ? "list-group-item active" : "list-group-item"}>{item[textProperty]}</li>)}

        </div>
    )
}

GenreFilter.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}

export default GenreFilter