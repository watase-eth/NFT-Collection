import { ConnectWallet } from '@thirdweb-dev/react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Navbar() {
    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <p>NFT Collection</p>
                <div>
                    <Link href="/profile/">
                        <p>My NFTs</p>
                    </Link>
                </div>
                <ConnectWallet />
            </div>
        </div>
    )
}