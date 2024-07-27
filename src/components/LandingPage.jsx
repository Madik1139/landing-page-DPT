import React, { useState, useEffect } from "react";
import {
    ChevronLeft,
    ChevronRight,
    MapPin,
    Phone,
    MessageCircle,
    X,
    Menu,
} from "lucide-react";
import VehicleCard from "./VehicleCard";
import emailjs from "@emailjs/browser";

const vehicles = [
    {
        name: "Bus Eksekutif",
        image: "/bus.jpg",
        description:
            "Bus nyaman untuk perjalanan jauh dengan kapasitas 40 orang.",
        price: 2000000,
    },
    {
        name: "Mini Bus",
        image: "/bus.jpg",
        description: "Mini bus ideal untuk kelompok kecil hingga 20 orang.",
        price: 1500000,
    },
    {
        name: "SUV Mewah",
        image: "/bus.jpg",
        description: "SUV mewah untuk perjalanan keluarga atau bisnis.",
        price: 1000000,
    },
];

export default function LandingPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [greeting, setGreeting] = useState("");
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 11) setGreeting("Selamat pagi");
        else if (hour < 14) setGreeting("Selamat siang");
        else if (hour < 18) setGreeting("Selamat sore");
        else setGreeting("Selamat malam");

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < lastScrollY) {
                setIsNavbarVisible(true);
            } else if (currentScrollY > 100) {
                setIsNavbarVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        // Inisialisasi EmailJS
        emailjs.init("IU107drTTQuroxlZd");

        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % vehicles.length);
    };

    const prevSlide = () => {
        setCurrentSlide(
            (prev) => (prev - 1 + vehicles.length) % vehicles.length
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Kirim email menggunakan EmailJS
        emailjs
            .send("service_mv7z4j5", "template_wf0m8kj", {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
            })
            .then(
                (result) => {
                    console.log("Email sent successfully:", result.text);
                    setIsEmailSent(true);
                    setFormData({ name: "", email: "", message: "" });
                },
                (error) => {
                    console.log("Failed to send email:", error.text);
                    alert("Gagal mengirim pesan. Silakan coba lagi.");
                }
            );
    };

    const whatsappMessage = encodeURIComponent(
        `${greeting}, bisakah saya memesan kendaraan?`
    );

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const closeSuccessMessage = () => {
        setIsEmailSent(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-100 to-white">
            <header
                className={`fixed w-full bg-teal-600 text-white py-4 transition-transform duration-300 z-50 ${
                    isNavbarVisible
                        ? "transform translate-y-0"
                        : "transform -translate-y-full"
                }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl md:text-3xl font-bold">
                            Dikma Putra Trans
                        </h1>
                        <button
                            className="md:hidden text-white focus:outline-none"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <nav className="hidden md:flex space-x-4">
                            <a
                                href="#vehicles"
                                className="text-white hover:text-teal-200"
                            >
                                Kendaraan
                            </a>
                            <a
                                href="#why-us"
                                className="text-white hover:text-teal-200"
                            >
                                Mengapa Kami
                            </a>
                            <a
                                href="#location"
                                className="text-white hover:text-teal-200"
                            >
                                Lokasi
                            </a>
                            <a
                                href="#contact"
                                className="text-white hover:text-teal-200"
                            >
                                Kontak
                            </a>
                        </nav>
                    </div>
                    {isMenuOpen && (
                        <nav className="mt-4 ml-2 md:hidden">
                            <a
                                href="#vehicles"
                                className="block py-2 text-white hover:text-teal-200"
                                onClick={closeMenu}
                            >
                                Kendaraan
                            </a>
                            <a
                                href="#why-us"
                                className="block py-2 text-white hover:text-teal-200"
                                onClick={closeMenu}
                            >
                                Mengapa Kami
                            </a>
                            <a
                                href="#location"
                                className="block py-2 text-white hover:text-teal-200"
                                onClick={closeMenu}
                            >
                                Lokasi
                            </a>
                            <a
                                href="#contact"
                                className="block py-2 text-white hover:text-teal-200"
                                onClick={closeMenu}
                            >
                                Kontak
                            </a>
                        </nav>
                    )}
                </div>
            </header>

            <a
                href={`https://wa.me/6282238255850?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors"
            >
                <MessageCircle className="w-6 h-6" />
            </a>

            <div className="pt-16">
                <main className="container mx-auto px-4 py-8">
                    <section id="vehicles" className="mb-16">
                        <h2 className="text-3xl font-semibold mb-6 text-teal-800 text-center">
                            Pilihan Kendaraan Kami
                        </h2>
                        <div className="relative">
                            <div className="overflow-hidden">
                                <div
                                    className="flex transition-transform duration-300 ease-in-out"
                                    style={{
                                        transform: `translateX(-${
                                            currentSlide * 100
                                        }%)`,
                                    }}
                                >
                                    {vehicles.map((vehicle, index) => (
                                        <div
                                            key={index}
                                            className="w-full flex-shrink-0 px-4"
                                        >
                                            <VehicleCard {...vehicle} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={prevSlide}
                                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-teal-100 transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6 text-teal-600" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-teal-100 transition-colors"
                            >
                                <ChevronRight className="w-6 h-6 text-teal-600" />
                            </button>
                        </div>
                    </section>

                    <section id="why-us" className="mb-16">
                        <h2 className="text-3xl font-semibold mb-6 text-teal-800 text-center">
                            Mengapa Memilih Kami?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-semibold mb-3 text-teal-600">
                                    Kendaraan Berkualitas
                                </h3>
                                <p className="text-gray-600">
                                    Armada kami selalu dalam kondisi prima dan
                                    terawat.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-semibold mb-3 text-teal-600">
                                    Harga Bersaing
                                </h3>
                                <p className="text-gray-600">
                                    Kami menawarkan harga yang kompetitif untuk
                                    setiap jenis kendaraan.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-semibold mb-3 text-teal-600">
                                    Pelayanan 24/7
                                </h3>
                                <p className="text-gray-600">
                                    Tim kami siap membantu Anda kapan pun Anda
                                    membutuhkan.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="location" className="mb-16">
                        <h2 className="text-3xl font-semibold mb-6 text-teal-800 text-center">
                            Lokasi Kami
                        </h2>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.6599587656847!2d111.36103527574512!3d-7.391946872774662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79e51fae6a1d8f%3A0xeb83f37f8eb9bcc7!2sDikma%20Putra%20Trans!5e0!3m2!1sid!2sid!4v1722073253947!5m2!1sid!2sid"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            <div className="mt-4 flex items-center text-teal-600">
                                <MapPin className="w-5 h-5 mr-2" />
                                <a
                                    href="https://maps.app.goo.gl/LvrPwmc7svM5dKr36"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    Lihat di Google Maps
                                </a>
                            </div>
                            {/* <div className="mt-2 flex items-center text-teal-600">
                                <Phone className="w-5 h-5 mr-2" />
                                <a
                                    href="tel:082238255850"
                                    className="hover:underline"
                                >
                                    082238255850
                                </a>
                            </div> */}
                        </div>
                    </section>

                    <section id="contact">
                        <h2 className="text-3xl font-semibold mb-6 text-teal-800 text-center">
                            Hubungi Kami
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto"
                        >
                            <div className="mb-6">
                                <label
                                    htmlFor="name"
                                    className="block text-gray-700 font-semibold mb-2"
                                >
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700 font-semibold mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="message"
                                    className="block text-gray-700 font-semibold mb-2"
                                >
                                    Pesan
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors w-full"
                            >
                                Kirim Pesan
                            </button>
                            {isEmailSent && (
                                <div
                                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-5"
                                    role="alert"
                                >
                                    <p className="text-center">
                                        <strong className="font-bold">
                                            Terima kasih!{" "}
                                        </strong>
                                        <br />
                                        <span className="block sm:inline">
                                            Pesan Anda telah terkirim. Kami akan
                                            menghubungi Anda segera.
                                        </span>
                                    </p>
                                    <button
                                        onClick={closeSuccessMessage}
                                        className="absolute top-0 right-0 p-2"
                                        aria-label="Close"
                                    >
                                        <X className="w-5 h-5 text-green-700" />
                                    </button>
                                </div>
                            )}
                        </form>
                    </section>
                </main>
            </div>

            <footer className="bg-teal-800 text-white py-8 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 Dikma Putra Trans. Hak Cipta Dilindungi.</p>
                    <div className="mt-4">
                        <a
                            href="#"
                            className="text-teal-200 hover:text-white mx-2"
                        >
                            Kebijakan Privasi
                        </a>
                        <a
                            href="#"
                            className="text-teal-200 hover:text-white mx-2"
                        >
                            Syarat dan Ketentuan
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
