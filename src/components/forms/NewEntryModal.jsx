"use client"
import React, { useState } from 'react'
import Modal from '../ui/Modal'
import { Info } from 'lucide-react'

const NewEntryModal = ({ isOpen, onClose, onSubmit }) => {
  const [taille, setTaille] = useState('')
  const [poids, setPoids] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newEntry = {
      taille: parseInt(taille),
      poids: parseFloat(poids)  
    }
    onSubmit(newEntry)
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setTaille('')
    setPoids('')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nouvelle entrée">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Info size={20} className="text-primary" />
            <h3 className="text-lg font-medium">Informations corporelles</h3>
          </div>
          
          <div>
            <label className="block text-sm text-text-secondary mb-1">
              Taille (cm)
            </label>
            <input
              required
              value={taille}
              onChange={(e) => setTaille(e.target.value)}
              type="number"
              className="w-full p-2 rounded-lg bg-background dark:bg-background-dark border-[1px] border-black/10 dark:border-white/5"
              placeholder="175"
            />
          </div>
          
          <div>
            <label className="block text-sm text-text-secondary mb-1">
              Poids (kg)
            </label>
            <input
              required
              value={poids}
              onChange={(e) => setPoids(e.target.value)}
              type="number"
              step="0.1"
              className="w-full p-2 rounded-lg bg-background dark:bg-background-dark border-[1px] border-black/10 dark:border-white/5"
              placeholder="70.5"
            />
          </div>
        </div>

        {/* Boutons */}
        <div className="flex gap-4 pt-6 border-t border-black/10 dark:border-white/5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border-[1px] border-black/10 dark:border-white/5 hover:bg-background dark:hover:bg-background-dark transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="flex-1 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            Créer
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default NewEntryModal