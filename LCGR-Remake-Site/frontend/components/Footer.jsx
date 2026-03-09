import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Newsletter from './Newsletter';


export default function Footer() {
  return (
    <footer className="bg-secondary-dark text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* About / Mission */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/images/8659e2_750ed3b7566848afa53ca40b98ae2755_mv2.png"
                alt="LGBT Center of Greater Reading"
                className="h-12 w-12 object-contain"
              />
              <div className="text-lg font-bold leading-tight">
                The LGBT Center<br />
                <span className="text-sm font-medium text-white/80">of Greater Reading</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              The LGBT Center of Greater Reading is dedicated to creating a safe, inclusive space
              for the LGBTQ+ community. We provide essential services, programs, and resources
              to support and empower our community members.
            </p>
            <div className="flex gap-3 items-center">
              <a
                href="https://www.facebook.com/theLGBTcenterofgreaterreading/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <img src="/images/23fd2a2be53141ed810f4d3dcdcd01fa.png" alt="Facebook" className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/thelgbtcenter"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <img src="/images/81af6121f84c41a5b4391d7d37fce12a.png" alt="Instagram" className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-4">
              <a
                href="https://app.candid.org/profile/9566926/lgbt-center-of-greater-reading-81-3191097"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src="/images/8659e2_df07d57335a44123b6256bb3624e7e74_mv2.png"
                  alt="Candid 2025 Platinum Seal"
                  className="h-16 w-auto object-contain"
                />
                <p className="text-white/60 text-xs mt-1">EIN: 81-3191097</p>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-light mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">
                  640 Centre Avenue<br />
                  Reading, PA 19601
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-light shrink-0" />
                <a href="tel:4843455765" className="text-white/60 hover:text-primary-light transition-colors text-sm">
                  (484) 345-5765
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-light shrink-0" />
                <a href="mailto:info@lgbtcenterofreading.com" className="text-white/60 hover:text-primary-light transition-colors text-sm break-all">
                  info@lgbtcenterofreading.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary-light mt-0.5 shrink-0" />
                <div className="text-white/60 text-sm">
                  <p>Mon - Fri: 12pm - 7:30pm</p>
                  <p>Sat - Sun: Closed</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Stay Connected</h3>
            <p className="text-white/60 text-sm mb-4">
              Subscribe to our newsletter for the latest news, events, and updates.
            </p>
            <Newsletter />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} LGBT Center of Greater Reading. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/resources" className="text-white/40 hover:text-white/60 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/resources" className="text-white/40 hover:text-white/60 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
