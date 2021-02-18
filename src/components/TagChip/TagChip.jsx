import Chip from '@material-ui/core/Chip';


function TagChip({tag, selectable, selected, onClick}) {


    return (

        <span>
            {selected
            ?
            <Chip
                label={tag.name}
                color="primary"
                onClick={onClick}
                clickable={selectable}
                value={tag.id}
                data-id={tag.id}


                // style={{
                //     backgroundColor: `#${tag.color}`,
                //     // border: 'solid 2px'
                // }}
            />
            :
            <Chip
                label={tag.name}
                variant="outlined"
                onClick={onClick}
                clickable={selectable}
                value={tag.id}
                data-id={tag.id}


                // style={{
                //     backgroundColor: `#${tag.color}`,
                // }}
            />
            }
        </span>
    )
}

export default TagChip;