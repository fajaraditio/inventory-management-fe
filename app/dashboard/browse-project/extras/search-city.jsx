import B2BProjectRegionalService from "@/app/lib/services/B2BProjectRegionalService"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { Check, ChevronsUpDown } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"

const SearchCity = () => {
    const t = useTranslations('BrowseProjectPage');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            let result = await B2BProjectRegionalService.fetchCity();

            setCities(result.data);
        }

        fetchCities();
    }, []);

    if (!cities) {
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
                            ? cities.find((city) => city.city_name === value)?.city_name
                            : t('select_city_name')}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Command>
                        <CommandInput placeholder="Search City..." />
                        <CommandList>
                            <CommandEmpty>No City found.</CommandEmpty>
                            <CommandGroup>
                                {cities.map((city) => (
                                    <CommandItem
                                        key={city.city_name}
                                        value={city.city_name}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === city.city_name ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {city.city_name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <Input type="hidden" name="city_name" value={value} />
        </>
    )
}

export default SearchCity;