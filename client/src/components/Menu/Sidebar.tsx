import { useCallback, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../utils/utilFunctions";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSidebarLink } from "../../app/reducers/globalReducer";
import AltametricsLogo from "../../assets/Altametrics_logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { NavigationItem } from "../../types/types";

export default function Sidebar() {
  const navigation = useSelector((state: RootState) => state.global.navigation);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the path from the location object
    const currentPath = location.pathname;

    // Find the navigation item that corresponds to the current path
    const currentItem = navigation.find((item) => item.href === currentPath);

    // Update the current sidebar link in the Redux state
    if (currentItem) {
      dispatch(setCurrentSidebarLink(currentItem.name));
    }
  }, [dispatch, location.pathname, navigation]);

  const handleSidebarLinkClick = useCallback(
    (item: NavigationItem): void => {
      dispatch(setCurrentSidebarLink(item.name));

      if (item.href) {
        navigate(item.href);
      }
    },
    [dispatch, navigate]
  );

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-secondary px-6 max-w-[14.5rem] w-full h-screen">
      <div className="flex h-16 shrink-0 items-center">
        <img
          className="h-8 w-auto"
          src={AltametricsLogo}
          alt="Altametrics Logo"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  {!item.children ? (
                    <Link
                      to={item.href ?? "/"}
                      // link with no children
                      onClick={() => handleSidebarLinkClick(item)}
                      className={classNames(
                        item.current ? "activeLink" : "inactiveLink",
                        "block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold"
                      )}>
                      {item.name}
                    </Link>
                  ) : (
                    <Disclosure as="div">
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            // link with children
                            onClick={() => handleSidebarLinkClick(item)}
                            className={classNames(
                              item.current ? "activeLink" : "inactiveLink",
                              "flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold"
                            )}>
                            <ChevronRightIcon
                              className={classNames(
                                open
                                  ? "rotate-90 text-gray-500"
                                  : "text-gray-400",
                                "h-5 w-5 shrink-0"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Disclosure.Button>
                          <Disclosure.Panel as="ul" className="mt-1 px-2">
                            {item?.children?.map((subItem) => (
                              <li key={subItem.name}>
                                <Disclosure.Button
                                  as="a"
                                  href={subItem.href}
                                  onClick={() =>
                                    handleSidebarLinkClick(subItem)
                                  }
                                  className={classNames(
                                    subItem.current
                                      ? "activeLink"
                                      : "inactiveLink",
                                    "block rounded-md py-2 pr-2 pl-9 text-sm leading-6"
                                  )}>
                                  {subItem.name}
                                </Disclosure.Button>
                              </li>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
