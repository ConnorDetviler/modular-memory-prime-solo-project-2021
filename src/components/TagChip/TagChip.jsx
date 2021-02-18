import Chip from '@material-ui/core/Chip';


function TagChip({tag, selectable, selected, onClick}) {


    return (

        <span>
            <Chip
                label={tag.name}
                variant={
                    selected ?
                    "default"
                    :
                    "outlined"
                }
                color="primary"
                onClick={onClick}
                clickable={selectable}
            />
        </span>
    )
}

export default TagChip;