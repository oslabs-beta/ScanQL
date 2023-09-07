import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import * as Switch from "@radix-ui/react-switch";
import { useEffect, } from "react";
// import { useMediaQuery } from "react-responsive";
import useAppStore from "../../store/appStore";

const DarkModeToggle = () => {

    const { theme, toggleTheme } = useAppStore();

    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [theme]);



    return (
        <div>
            <Switch.Root className="dark-mode-toggle"
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
            >

                {
                    theme === 'light' ?

                        <MoonIcon
                            className="toggle-moon text-indigo-700"
                            width={14}
                            height={14} />

                        :

                        <SunIcon className="toggle-sun text-white" width={14} height={14} />


                }
                <Switch.Thumb className="SwitchThumb" />
            </Switch.Root>
        </div>
    );
};

export default DarkModeToggle;

