import Chip from '@material-ui/core/Chip';


function TagChip({tag, selectable, selected}) {


    return (

        <span>
            {selected
            ?
            <Chip
                label={tag.name}
                color="primary"
                // style={{
                //     backgroundColor: `#${tag.color}`,
                //     // border: 'solid 2px'
                // }}
            />
            :
            <Chip
                label={tag.name}
                variant="outlined"
                // style={{
                //     backgroundColor: `#${tag.color}`,
                // }}
            />
            }
        </span>
    )
}

export default TagChip;