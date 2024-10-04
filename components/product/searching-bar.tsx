'use client';

import { Button } from "../ui/button"
import { Input } from "../ui/input"

const SearchingBar = () => {
  return (
     <div className="flex w-full max-w-sm items-center space-x-2">
      <Input className={'bg-white'} type="text" placeholder="Search product by title or sku..." />
      <Button type="submit">Search</Button>
    </div>
  )
}

export default SearchingBar;