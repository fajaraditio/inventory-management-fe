import B2BProjectRegionalService from "@/app/lib/services/B2BProjectRegionalService"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { Check, ChevronsUpDown } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

const SearchSubDistrict = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [subDistricts, setSubDistricts] = useState([]);

    useEffect(() => {
        const fetchSubDistricts = async () => {
            let result = await B2BProjectRegionalService.fetchSubDistrict();

            setSubDistricts(result.data);
        }

        fetchSubDistricts();
    }, []);

    if (!subDistricts) {
        return (<Skeleton className="h-[50px] w-auto rounded-xl" />);
    }

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className="w-full">
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="justify-between"
                    >
                        {value
                            ? subDistricts.find((subDistrict) => subDistrict.sub_district_name === value)?.sub_district_name
                            : "Select Project Sub District"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Command>
                        <CommandInput placeholder="Search District..." />
                        <CommandList>
                            <CommandEmpty>No Sub District found.</CommandEmpty>
                            <CommandGroup>
                                {subDistricts.map((subDistrict) => (
                                    <CommandItem
                                        key={subDistrict.sub_district_name}
                                        value={subDistrict.sub_district_name}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === subDistrict.sub_district_name ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {subDistrict.sub_district_name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <Input type="hidden" name="sub_district_name" value={value}></Input>
        </>
    )
}

export default SearchSubDistrict;