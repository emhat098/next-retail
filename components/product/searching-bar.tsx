'use client';

import { ChangeEvent, FC, PropsWithChildren, useEffect, useState } from "react";
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from '@uidotdev/usehooks'

interface SearchingBarProps extends PropsWithChildren {}

const SearchingBar: FC<SearchingBarProps> = ({children}) => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') ?? '');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOnSearch = (q: string) => {
    router.push('?q=' + q);
    router.refresh();
  }

  const onSearch = () => {
    handleOnSearch(searchTerm);
  }

  useEffect(() => {
    if (searchTerm !== searchParams.get('q')) {
      handleOnSearch(searchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        value={searchTerm}
        className={'bg-white'}
        type="text"
        placeholder="Search product by title or sku..."
        onChange={handleChange}
      />
      <Button type="button" size={'sm'} onClick={onSearch}>Search</Button>
      {children}
    </div>
  )
}

export default SearchingBar;