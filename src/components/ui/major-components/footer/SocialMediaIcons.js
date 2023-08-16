import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const SocialIcons = () => {
    const icons = [
        // {icon :  'ti-facebook' , brand : 'FaceBook', link : '/'},
        {icon :  'fa-brands fa-twitter' , brand : 'Twitter', link: 'https://twitter.com/bot_benchmark'},
        {icon :  'fa-brands fa-linkedin' , brand : 'LinkedIn', link: 'https://www.linkedin.com/company/bot-benchmark'},
        // {icon :  'ti-google' , brand : 'Google', link : ''},
        // {icon :  'ti-pinterest' , brand : 'Github', link :''},
        // {icon :  'ti-instagram' , brand : 'Instagram', link: ''}
    ]

    return (
        <>
                <ul>
                    {icons.map((icon, index) => (
                        <li >
                            <a  href={icon.link} target="_blank">
                                <FontAwesomeIcon size="md" icon={icon.icon} />
                            </a>
                        </li>
                    ))}
                </ul>
        </>
    )

}