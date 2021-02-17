import Chip from '@material-ui/core/Chip';

function TagChip({tag, selectable}) {
    return (
        <Chip
         label={tag.name}
         style={{backgroundColor: `#${tag.color}`}}
        />
    )
}

export default TagChip;