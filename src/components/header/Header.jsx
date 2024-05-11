import styles from './header.module.css';

const Header = () => {
    return (
        <header className={`${styles.headerWrap}`}>
            <div className={`container ${styles.customContainer} my-0 ml-auto mr-auto py-1 md:px-5 2xsmall:px-4 lg:max-w-[1024px] xl:max-w-[1320px]`}>
                <h2 className="text-[#111827] 2xsmall:text-[24px] xsmall:text-[26px] leading-9 font-bold">Master Price</h2>
            </div>
        </header>
    );
}

export default Header;
