import type { Dispatch, SetStateAction } from "react"
import css from "./SearchBox.module.css"

interface SearchBoxProps {
  onChange: Dispatch<SetStateAction<string>>
}
const SearchBox = ({onChange}: SearchBoxProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
const searchQuery = event.target.value
onChange(searchQuery)
  }
  return (
    <div>
      <input
      onChange={handleInputChange}
  className={css.input}
  type="text"
  placeholder="Search notes"
 />
    </div>
  )
}

export default SearchBox
