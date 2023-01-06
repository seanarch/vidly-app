import React from 'react'

const GenreFilter = (props) => {
    const { items, textProperty, valueProperty, onItemSelect, selectedItem } = props;

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