import Select from 'react-select'
import classes from './Category.module.css'

const categoryOptions = [
    {value: '' , label: 'All Categories'},
    {value: 'animals' , label: 'Animals'},
    {value: 'flowers' , label: 'Flowers'},
    {value: 'fruits' , label: 'Fruits'},
    {value: 'lights' , label: 'Lights'},
    {value: 'minimalist' , label: 'Minimalist'},
    {value: 'nature' , label: 'Nature'},
    {value: 'people' , label: 'People'},
    {value: 'sailing' , label: 'Sailing'},
    {value: 'shadow' , label: 'Shadow'},
]

const customStyle = {
    control: (provided) => ({
        ...provided,
        backgroundColor: 'transparent',
        border: 'none',
        boxShadow: 'none',
        color: '#262626',
        outline: 'none',
        '&:hover': {
            border: 'none', 
        },
        '&:focus': {
            outline: 'none',
            boxShadow: 'none', 
        },
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '5px', 
        padding: '5px',
        boxShadow: '0px 0px 5px #595959'
    }),
    menuList: (base) => ({
        ...base,
        maxHeight: '200px', 
        overflowY: 'auto',
        '::-webkit-scrollbar' :{
            width: '3px',
        },
        '::-webkit-scrollbar-thumb' :{
            background: '#d9d9d9',
            borderRadius: '10px',
        },
        '::-webkit-scrollbar-thumb:hover ':{
            background: '#a6a6a6'
        }
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#595959',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#262626',
        '&:hover': {
            color: '#595959',
        },
        cursor: 'pointer',
        
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#a6a6a6' : 'transparent',
        color: '#262626',
        '&:hover': {
            backgroundColor: '#a6a6a62e',
        },
        cursor: 'pointer',
        borderRadius: '25px',
        width: '95%'
        
    }),
}

export default function Category({selectedCategory, setSelectedCategory}){
    return(
        <div className={classes.category}>
            <Select 
                options={categoryOptions}
                defaultValue={categoryOptions[0]}
                value={categoryOptions.find((option) => option.value === selectedCategory)}
                onChange={(option) => setSelectedCategory(option.value)}
                styles={customStyle}
                isSearchable={false}
            />
        </div>
    )
}


// export default function Category({selectedCategory, setSelectedCategory}){
//     function handleSelectChange(event){
//         setSelectedCategory(event.target.value)
//     }
//     return(
//         <div className={classes.category}>
//             <select  
//                 value={selectedCategory}
//                 onChange={handleSelectChange}
//             >
//                 <option value=''>All Categories</option>
//                 <option value='animals'>Animals</option>
//                 <option value='flowers'>Flowers</option>
//                 <option value='fruits'>Fruits</option>
//                 <option value='lights'>Lights</option>
//                 <option value='minimalist'>Minimalist</option>
//                 <option value='nature'>Nature</option>
//                 <option value='people'>People</option>
//                 <option value='sailing'>Sailing</option>
//                 <option value='shadow'>Shadow</option>
//             </select>
//         </div>
//     )
// }