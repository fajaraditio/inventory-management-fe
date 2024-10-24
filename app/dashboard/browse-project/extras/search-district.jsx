import B2BProjectRegionalService from "@/app/lib/services/B2BProjectRegionalService"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { Check, ChevronsUpDown } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const SearchDistrict = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        const fetchDistricts = async () => {
            let result = await B2BProjectRegionalService.fetchDistrict();

            setDistricts(result.data);
        }

        fetchDistricts();
    }, []);

    if (!districts) {
        return (<Skeleton className="h-[50px] w-auto rounded-xl" />);
    }

    return (
        <div className="block">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className="w-full">
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="justify-between"
                    >
                        {value
                            ? districts.find((district) => district.district_name === value)?.district_name
                            : "Select Project District"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Command>
                        <CommandInput placeholder="Search District..." />
                        <CommandList>
                            <CommandEmpty>No District found.</CommandEmpty>
                            <CommandGroup>
                                {districts.map((district) => (
                                    <CommandItem
                                        key={district.district_name}
                                        value={district.district_name}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === district.district_name ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {district.district_name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default SearchDistrict;