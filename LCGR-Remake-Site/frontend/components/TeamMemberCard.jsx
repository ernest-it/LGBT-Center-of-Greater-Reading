'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

export default function TeamMemberCard({ name, title, bio, photo }) {
  const [showBio, setShowBio] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
      className="group relative"
    >
      <div
        className="relative overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/5 border border-gray-100 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
        onClick={() => setShowBio(!showBio)}
      >
        {/* Photo */}
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary-light/30 to-accent/10">
          {photo ? (
            <img
              src={photo}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-20 h-20 text-primary/20" />
            </div>
          )}
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/90 via-secondary-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <p className="text-white/90 text-sm leading-relaxed line-clamp-4">
              {bio || 'Click to learn more about this team member.'}
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-secondary">{name}</h3>
          <p className="text-primary text-sm font-medium mt-1">{title}</p>
        </div>
      </div>

      {/* Expanded Bio (mobile-friendly) */}
      {showBio && bio && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-2 p-4 bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <p className="text-secondary/70 text-sm leading-relaxed">{bio}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
