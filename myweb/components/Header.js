import Link from 'next/link'

const Header = () => {
    return (
        <ul>
            <li>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </li>

            <li>
                <Link href="/about">
                    <a>About Us</a>
                </Link>
            </li>

            <li>
                <Link href="/blog/hello-world">
                    <a>Blog Post</a>
                </Link>
            </li>
            
            <li>
                <Link href="/post/basic">
                    <a>Basic Dynamic Routes: goto pages/post/[pid].js</a>
                </Link>
            </li>

            <li>
                <Link href="/post/param?foo=bar">
                    <a>Dynamic Routes with param: goto pages/post/[pid].js</a>
                </Link>
            </li>
        </ul>
    )
}

export default Header