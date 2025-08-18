class Audience {
    static nextId = 1;
    id: number;
    name: string;
    email: string;
    phone: string;
    constructor(name: string, email: string, phone: string) {
        this.id = Audience.nextId++;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
    getDetails() {
        return `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}`;
    }
}
abstract class Movie {
    static nextId = 1;
    id: number;
    title: string;
    genre: string;
    tickPrice: number;
    isShowing: boolean;
    constructor(title: string, genre: string, tickPrice: number, isShowing: boolean) {
        this.id = Movie.nextId++;
        this.title = title;
        this.genre = genre;
        this.tickPrice = tickPrice;
        this.isShowing = isShowing;
    }
    startShow() {
        this.isShowing = true;
    }
    stopShow() {
        this.isShowing = false;
    }
    abstract caculateTicketCost(quantity: number): number;
    abstract getSpecialOffers(): string[];
    abstract getMovieInfo(): string;
}
class ActionMovie extends Movie {
    Promotional: string[] = [`Mien phi bap rang bo `, `tang poster`];
    description: string = `Phim hanh dong gay can , ky xao hoang nhoang`;
    constructor(title: string, genre: string, tickPrice: number, isShowing: boolean) {
        super(title, genre, tickPrice, isShowing);
    }
    caculateTicketCost(quantity: number): number {
        return this.tickPrice * quantity;
    }
    getSpecialOffers(): string[] {
        return this.Promotional;
    }
    getMovieInfo(): string {
        return this.description;
    }
}
class ComedyMovie extends Movie {
    Promotional: string[] = [`Giam 10% cho nhom tren 4 nguoi`];
    description = `phim hai nhe vui nhon`;
    constructor(title: string, genre: string, tickPrice: number, isShowing: boolean) {
        super(title, genre, tickPrice, isShowing);
    }
    caculateTicketCost(quantity: number): number {
        return this.tickPrice * quantity;
    }
    getSpecialOffers(): string[] {
        return this.Promotional;
    }
    getMovieInfo(): string {
        return this.description;
    }
}
class AnimationMovie extends Movie {
    Promotional: string[] = [`Giam gia cho tre duoi 12 tuoi`];
    description: string = `phim hoat hinh voi hinh anh song dong`;
    constructor(title: string, genre: string, tickPrice: number, isShowing: boolean) {
        super(title, genre, tickPrice, isShowing);
    }
    caculateTicketCost(quantity: number): number {
        return this.tickPrice * quantity;
    }
    getSpecialOffers(): string[] {
        return this.Promotional;
    }
    getMovieInfo(): string {
        return this.description;
    }
}
class TicketBooking {
    static nextId = 1;
    bookingID: number;
    audience: Audience;
    movie: Movie;
    quantity: number;
    totalPrice: number;
    constructor(audience: Audience, movie: Movie, quantity: number) {
        this.bookingID = TicketBooking.nextId++;
        this.audience = audience;
        this.movie = movie;
        this.quantity = quantity;
        this.totalPrice = movie.caculateTicketCost(quantity);
    }
    getDetails() {
        return `Booking ID: ${this.bookingID}, Audience: ${this.audience.getDetails()}, Movie: ${this.movie.getMovieInfo()}, Quantity: ${this.quantity}, Total Price: ${this.totalPrice}`;
    }
}
class Cinema {
    movies: Movie[] = []
    audiences: Audience[] = []
    bookings: TicketBooking[] = []

    addMovie(movie: Movie): void {
        this.movies.push(movie);
    }
    addAudience(name: string, email: string, phone: string): Audience {
        const audience = new Audience(name, email, phone);
        this.audiences.push(audience);
        return audience;
    }
    bookTickets(audienceId: number, movieId: number, quantity: number): TicketBooking | null {
        const audience = this.audiences.find(a => a.id === audienceId);
        const movie = this.movies.find(m => m.id === movieId);
        if (audience && movie && movie.isShowing) {
            const booking = new TicketBooking(audience, movie, quantity);
            this.bookings.push(booking);
            return booking;
        }
        return null;
    }
    cancelMovie(movieID: number): void {
        const movieIndex = this.movies.findIndex(m => m.id === movieID);
        if (movieIndex !== -1) {
            this.movies.splice(movieIndex, 1);
            console.log(`Da dung phim`);

        } else {
            console.log(`khong tim thay phim`);
        }
    }
    listShowingMovies(): void {
        const showingMovies = this.movies.filter(m => m.isShowing);
        if (showingMovies.length > 0) {
            console.log("Danh sach phim dang chieu:");
            showingMovies.forEach(m => {
                console.log(`- ${m.title}`);
            });
        } else {
            console.log("Khong co phim nao dang chieu");
        }
    }
    listAudience(): void {
        const list = this.audiences;
        list.forEach(a => {
            console.log(a.name);

        })
    }
    
    calculateTotalRevenue(): number {
        return this.bookings.reduce((total, booking) => total + booking.totalPrice, 0);
    }
    getMovieSpecialOffers(movieId: number): void {
        const movie = this.movies.find(m => m.id === movieId);
        if (movie) {
            const specialOffers = movie.getSpecialOffers();
            console.log(`Khuyen mai cho phim ${movie.title}:`);
            specialOffers.forEach(offer => {
                console.log(` ${offer}`);
            });
        } else {
            console.log("Phim khong ton tai");
        }
    }
}
const choose = new Cinema();
function main() {
    let exit = false;
    while (!exit) {
        const choice = prompt(`Chon chuc nang:
            1.Them khan gia 
            2.Them phim moi
            3.Dat ve
            4.Ngung chieu phim
            5.Hien thi danh sach phim dang chieu
            6.Hien thi cac dat ve cua mot khach hang
            7.Tinh va hien thi tong doanh thu
            8.Dem so luong tung the loai phim
            9.Tim kiem va hien thi thong tin bang madinh danh
            10.Hien thi uu dai cua mot phim
            11.Thoat chuong trinh
        `);
        switch (choice) {
            case "1":
                const name = prompt("Nhap ten khach hang:");
                const email = prompt("Nhap email khach hang:");
                const phone = prompt("Nhap so dien thoai khach hang:");
                if (name && email && phone) {
                    choose.addAudience(name, email, phone);
                    alert(`Them thanh cong`);
                }
                break;
            case "2":
                const type = prompt(`Chon the loai phim: 1.Action 2. Comedy 3.Animation`);
                const title = prompt("Nhap ten phim:");
                const genre = prompt("Nhap the loai:");
                const price = Number(prompt("Nhap gia ve:"));
                const isShowing = confirm("Phim co dang chieu ko");
                let movie;
                if (!title || !genre || isNaN(price)) {
                    alert("Thong tin phim khong hop le");
                    break;
                }
                if (type === "1") {
                    movie = new ActionMovie(title, genre, price, isShowing);
                } else if (type === "2") {
                    movie = new ComedyMovie(title, genre, price, isShowing);
                } else if (type === "3") {
                    movie = new AnimationMovie(title, genre, price, isShowing);
                }
                if (movie) {
                    choose.addMovie(movie);
                    alert("Them phim thanh cong");
                }
                break;
            case "3":
                choose.listShowingMovies();
                choose.listAudience();
                const audienceId = Number(prompt("Nhap ID khach hang:"));
                const movieId = Number(prompt("Nhap ID phim:"));
                const quantity = Number(prompt("Nhap so luong ve:"));
                const booking = choose.bookTickets(audienceId, movieId, quantity);
                if (booking) {
                    alert("Dat ve thanh cong");
                } else {
                    alert("Dat ve that bai");
                }
                break;
            case "4":
                const stopId = Number(prompt("Nhap ID phim can ngung chieu:"));
                choose.cancelMovie(stopId);
                break;
            case "5":
                choose.listShowingMovies();
                break;
            case "6":
                console.log("Dang phat trien");
                break;
            case "7":
                alert("Tong doanh thu: " + choose.calculateTotalRevenue());
                break;
            case "8":
                console.log("Dang phat trien");
                break;
            case "9":
                console.log("Dang phat trien");
            case "10":
                const idOffer = Number(prompt("Nhap ID phim:"));
                choose.getMovieSpecialOffers(idOffer);
                break;
            case "11":
                exit = true;
                break;
            default:
                console.log("Lua chon khong hop le");
        }
    }
}

main();