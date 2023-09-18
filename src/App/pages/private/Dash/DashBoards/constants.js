export const apps = [{index: 1, name: 'Secured', category: 'Banking', img: '../assets/img/img-2.jpg'}, {
    index: 2,
    name: 'Cyber',
    category: 'Security',
    img: '../assets/img/img-1.jpg'
}, {index: 3, name: 'Alpha', category: 'Blockchain', img: '../assets/img/img-3.jpg'}, {
    index: 4,
    name: 'Beta',
    category: 'Web3',
    img: '../assets/img/img-4.jpg'
}, {index: 5, name: 'Gama', category: 'Design', img: '../assets/img/img-5.jpg'}, {
    index: 6,
    name: 'Rompro',
    category: 'Security',
    img: '../assets/img/img-1.jpg'
},];
export const MAIN_CONTENT_DATA = [{
    id: 1,
    icon: "chart-bar",
    category: "PRODUCTS",
    title: "Number of products",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    updatedAt: "Just Updated",

}]


export const CARD_SWIPER_DATA = [{
    id: 1,
    title: "Project Title 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://via.placeholder.com/400x300.png?text=Project+Image+1",
}, {
    id: 2,
    title: "Project Title 2",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "https://via.placeholder.com/400x300.png?text=Project+Image+2",
}, {
    id: 3,
    title: "Project Title 3",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    image: "https://via.placeholder.com/400x300.png?text=Project+Image+3",
}, {
    id: 4,
    title: "Project Title 4",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://via.placeholder.com/400x300.png?text=Project+Image+4",
}, {
    id: 5,
    title: "Project Title 5",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    image: "https://via.placeholder.com/400x300.png?text=Project+Image+5",
}, {
    id: 6,
    title: "Project Title 6",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    image: "https://via.placeholder.com/400x300.png?text=Project+Image+6",
},];
export const CARDS_DATA = [{
    id: 1, name: "Card 1", category: "Category 1", imageUrl: "https://picsum.photos/id/1018/400/300"
}, {
    id: 2, name: "Card 2", category: "Category 2", imageUrl: "https://picsum.photos/id/1015/400/300"
}, {
    id: 3, name: "Card 3", category: "Category 3", imageUrl: "https://picsum.photos/id/1019/400/300"
}, {
    id: 4, name: "Card 4", category: "Category 4", imageUrl: "https://picsum.photos/id/1021/400/300"
}, {
    id: 5, name: "Card 5", category: "Category 5", imageUrl: "https://picsum.photos/id/1037/400/300"
}, {
    id: 6, name: "Card 6", category: "Category 6", imageUrl: "https://picsum.photos/id/106/400/300"
}];


// export const transactions = [
//     {
//         id: 1,
//         name: "Spotify",
//         amount: 2500,
//         date: "Wed 3:00pm",
//         logo: "../assets/img/small-logos/logo-spotify.svg",
//         cardType: "visa",
//         cardNumber: "Visa 1234",
//         cardExpiry: "Expiry 06/2026",
//     },
//     {
//         id: 2,
//         name: "Invision",
//         amount: 5000,
//         date: "Wed 1:00pm",
//         logo: "../assets/img/small-logos/logo-invision.svg",
//         cardType: "mastercard",
//         cardNumber: "Mastercard 1234",
//         cardExpiry: "Expiry 06/2026",
//     },
//     {
//         id: 3,
//         name: "Jira",
//         amount: 3400,
//         date: "Mon 7:40pm",
//         logo: "../assets/img/small-logos/logo-jira.svg",
//         cardType: "mastercard",
//         cardNumber: "Mastercard 1234",
//         cardExpiry: "Expiry 06/2026",
//     },
//     {
//         id: 4,
//         name: "Slack",
//         amount: 1000,
//         date: "Wed 5:00pm",
//         logo: "../assets/img/small-logos/logo-slack.svg",
//         cardType: "visa",
//         cardNumber: "Visa 1234",
//         cardExpiry: "Expiry 06/2026",
//     },
// ];
export const transactions = [{
    company: "Spotify", amount: "$2,500", date: "Wed 3:00pm", account: {
        logo: "../assets/img/logos/visa.png", name: "Visa 1234", expiry: "Expiry 06/2026"
    }
}, {
    company: "Invision", amount: "$5,000", date: "Wed 1:00pm", account: {
        logo: "../assets/img/logos/mastercard.png", name: "Mastercard 1234", expiry: "Expiry 06/2026"
    }
}, {
    company: "Jira", amount: "$3,400", date: "Mon 7:40pm", account: {
        logo: "../assets/img/logos/mastercard.png", name: "Mastercard 1234", expiry: "Expiry 06/2026"
    }
}, {
    company: "Slack", amount: "$1,000", date: "Wed 5:00pm", account: {
        logo: "../assets/img/logos/visa.png", name: "Visa 1234", expiry: "Expiry 06/2026"
    }
}];
export const barChartLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export const barChartData = [{
    label: "Sales",
    tension: 0.4,
    borderWidth: 0,
    borderSkipped: false,
    backgroundColor: "#2ca8ff",
    data: [450, 200, 100, 220, 500, 100, 400, 230, 500, 200],
    maxBarThickness: 6,
}, {
    label: "Sales",
    tension: 0.4,
    borderWidth: 0,
    borderSkipped: false,
    backgroundColor: "#7c3aed",
    data: [200, 300, 200, 420, 400, 200, 300, 430, 400, 300],
    maxBarThickness: 6,
},];

export const lineChartLabels = ["Aug 18", "Aug 19", "Aug 20", "Aug 21", "Aug 22", "Aug 23", "Aug 24", "Aug 25", "Aug 26", "Aug 27", "Aug 28", "Aug 29", "Aug 30", "Aug 31", "Sept 01", "Sept 02", "Sept 03", "Aug 22", "Sept 04", "Sept 05", "Sept 06", "Sept 07", "Sept 08", "Sept 09",];

export const CHART_COLORS = {
    blue: {
        gradientStroke1: {
            end: [0, 50],
            start: [0, 230],
            colors: [{offset: 0, color: "rgba(45,168,255,0)"}, {offset: 0.2, color: "rgba(45,168,255,0.0)"}, {
                offset: 1,
                color: "rgba(45,168,255,0.2)"
            },],
        },
    }, purple: {
        gradientStroke2: {
            end: [0, 50],
            start: [0, 230],
            colors: [{offset: 0, color: "rgba(119,77,211,0)"}, {offset: 0.7, color: "rgba(119,77,211,0.1)"}, {
                offset: 1,
                color: "rgba(119,77,211,0.4)"
            },],
        },
    },
};

export const CHART_LABELS = ['Aug 18', 'Aug 19', 'Aug 20', 'Aug 21', 'Aug 22', 'Aug 23', 'Aug 24', 'Aug 25', 'Aug 26', 'Aug 27', 'Aug 28', 'Aug 29', 'Aug 30', 'Aug 31', 'Sept 01', 'Sept 02', 'Sept 03', 'Aug 22', 'Sept 04', 'Sept 05', 'Sept 06', 'Sept 07', 'Sept 08', 'Sept 09',];

// export const CHART_COLORS = ['#2ca8ff', '#832bf9'];

export const CHART_DATA = [[2828, 1291, 3360, 3223, 1630, 980, 2059, 3092, 1831, 1842, 1902, 1478, 1123, 2444, 2636, 2593, 2885, 1764, 898, 1356, 2573, 3382, 2858, 4228], [2797, 2182, 1069, 2098, 3309, 3881, 2059, 3239, 6215, 2185, 2115, 5430, 4648, 2444, 2161, 3018, 1153, 1068, 2192, 1152, 2129, 1396, 2067, 1215, 712, 2462, 1669, 2360, 2787, 861],];

export const BAR_CHART_DATA = [[450, 200, 100, 220, 500, 100, 400, 230, 500, 200], [200, 300, 200, 420, 400, 200, 300, 430, 400, 300],];

export const BAR_CHART_LABELS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

