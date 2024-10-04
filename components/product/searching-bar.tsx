'use client';

import { FC, PropsWithChildren } from "react";
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface SearchingBarProps extends PropsWithChildren {}

const SearchingBar: FC<SearchingBarProps> = ({children}) => {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input className={'bg-white'} type="text" placeholder="Search product by title or sku..." />
      <Button type="submit">Search</Button>
      {children}
    </div>
  )
}

export default SearchingBar;