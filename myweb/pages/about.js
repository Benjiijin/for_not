import Image from 'next/image'
import snow from '../public/snow.jpg'

export const getStaticProps = async () => {
    console.log(process.env.DB_HOST)
    return{
        props : {
            db_host: process.env.DB_HOST,
            db_user: process.env.DB_USER,
            db_pass: process.env.DB_PASS,


        }
            
        
    }
}

function About({db_host, db_user, db_pass}){
    return (
        <div>
            <h1>About page !!!</h1>
        <p> db_host {db_host}, db_user {db_user}, db_pass {db_pass}</p>
            <Image
            src={snow}
            alt="rabbit" />
            
        </div>
    )
}

export default About;