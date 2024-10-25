import B2BProjectRegionalService from "@/app/lib/services/B2BProjectRegionalService"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { Check, ChevronsUpDown } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

const SearchProvince = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [provinces, setProvinces] = useState([]);

    useEffect(() => {
        const fetchProvinces = async () => {
            let result = await B2BProjectRegionalService.fetchProvince();

            setProvinces(result.data);
        }

        fetchProvinces();
    }, []);

    if (!provinces) {
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
                            ? provinces.find((province) => province.province_name === value)?.province_name
                            : "Select Project Province"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Command>
                        <CommandInput placeholder="Search Province..." />
                        <CommandList>
                            <CommandEmpty>No Province found.</CommandEmpty>
                            <CommandGroup>
                                {provinces.map((province) => (
                                    <CommandItem
                                        key={province.province_name}
                                        value={province.province_name}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === province.province_name ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {province.province_name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <Input type="hidden" name="province_name" value={value} />
        </>
    )
}

export default SearchProvince;