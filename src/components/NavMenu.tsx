import { Menu, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Fragment } from 'react';

type Props = {
  navListData: {
    label: string;
    href: string;
    icon: string;
  }[];
  className?: string;
};

function NavMenu({ navListData, className }: Props) {
  return (
    <Menu as="div" className={`${className} relative inline-block text-left`}>
      <div>
        <Menu.Button className="w-11 space-y-1.5 rounded border border-stone-200 bg-white px-2.5 py-2">
          <div className="h-0.5 bg-blue-900" />
          <div className="h-0.5 bg-blue-900" />
          <div className="h-0.5 bg-blue-900" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-stone-100 rounded-md bg-white shadow">
          <div className="p-1">
            {navListData.map(navItem => (
              <Menu.Item key={navItem.href}>
                {({ active }) => (
                  <Link href={navItem.href}>
                    <a
                      className={`${
                        active
                          ? 'border-stone-200 bg-stone-100'
                          : 'border-transparent'
                      } flex items-center gap-3 rounded-sm border p-2 text-blue-900 hover:border-stone-200 hover:bg-stone-100`}
                    >
                      <Icon
                        icon={navItem.icon}
                        className="inline-block h-5 w-5 shrink-0"
                      />
                      {navItem.label}
                    </a>
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default NavMenu;
