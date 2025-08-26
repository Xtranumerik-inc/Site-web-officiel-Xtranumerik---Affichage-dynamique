/**
 * GESTIONNAIRE DE FORMULAIRES XTRANUMERIK
 * Validation, soumission et feedback utilisateur
 */

class XtranumerikForms {
    constructor() {
        this.forms = new Map();
        this.validators = new Map();
        this.init();
    }

    init() {
        // Initialiser tous les formulaires de la page
        document.querySelectorAll('form[data-xtranumerik-form]').forEach(form => {
            this.initForm(form);
        });

        // Validation en temps réel sur les champs
        document.addEventListener('input', (e) => {
            if (e.target.matches('input[data-validate], textarea[data-validate]')) {
                this.validateField(e.target);
            }
        });

        console.log('Xtranumerik Forms initialized');
    }

    initForm(form) {
        const formId = form.id || 'form-' + Date.now();
        form.id = formId;

        const config = {
            element: form,
            type: form.dataset.xtranumerikForm,
            fields: new Map(),
            isValid: false
        };

        // Identifier tous les champs du formulaire
        form.querySelectorAll('input, textarea, select').forEach(field => {
            if (field.name) {
                config.fields.set(field.name, {
                    element: field,
                    isValid: false,
                    validationRules: this.parseValidationRules(field)
                });
            }
        });

        // Event listener pour soumission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit(formId);
        });

        this.forms.set(formId, config);
    }

    parseValidationRules(field) {
        const rules = {};
        const validate = field.dataset.validate;

        if (!validate) return rules;

        // Parser les règles de validation
        validate.split('|').forEach(rule => {
            if (rule === 'required') {
                rules.required = true;
            } else if (rule === 'email') {
                rules.email = true;
            } else if (rule === 'phone') {
                rules.phone = true;
            } else if (rule.startsWith('min:')) {
                rules.min = parseInt(rule.split(':')[1]);
            } else if (rule.startsWith('max:')) {
                rules.max = parseInt(rule.split(':')[1]);
            }
        });

        return rules;
    }

    validateField(field) {
        const form = field.closest('form');
        const formId = form.id;
        const formConfig = this.forms.get(formId);
        
        if (!formConfig) return;

        const fieldConfig = formConfig.fields.get(field.name);
        if (!fieldConfig) return;

        const value = field.value.trim();
        const rules = fieldConfig.validationRules;
        let isValid = true;
        let errorMessage = '';

        // Validation required
        if (rules.required && !value) {
            isValid = false;
            errorMessage = 'Ce champ est requis';
        }

        // Validation email
        if (rules.email && value && !window.XtranumerikUtils.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Adresse email invalide';
        }

        // Validation phone
        if (rules.phone && value && !window.XtranumerikUtils.isValidPhone(value)) {
            isValid = false;
            errorMessage = 'Numéro de téléphone invalide';
        }

        // Validation longueur minimum
        if (rules.min && value.length < rules.min) {
            isValid = false;
            errorMessage = `Minimum ${rules.min} caractères requis`;
        }

        // Validation longueur maximum
        if (rules.max && value.length > rules.max) {
            isValid = false;
            errorMessage = `Maximum ${rules.max} caractères autorisés`;
        }

        // Mettre à jour l'état du champ
        fieldConfig.isValid = isValid;
        this.showFieldValidation(field, isValid, errorMessage);

        // Vérifier si tout le formulaire est valide
        this.updateFormValidation(formId);

        return isValid;
    }
    showFieldValidation(field, isValid, errorMessage) {
        // Supprimer les messages d'erreur existants
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Modifier les classes CSS
        field.classList.remove('field-valid', 'field-invalid');
        
        if (field.value.trim()) {
            field.classList.add(isValid ? 'field-valid' : 'field-invalid');
        }

        // Ajouter message d'erreur si nécessaire
        if (!isValid && errorMessage) {
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.textContent = errorMessage;
            field.parentNode.appendChild(errorElement);
        }
    }

    updateFormValidation(formId) {
        const formConfig = this.forms.get(formId);
        if (!formConfig) return;

        // Vérifier si tous les champs sont valides
        let allValid = true;
        for (const [name, fieldConfig] of formConfig.fields) {
            if (fieldConfig.validationRules.required || fieldConfig.element.value.trim()) {
                if (!fieldConfig.isValid) {
                    allValid = false;
                    break;
                }
            }
        }

        formConfig.isValid = allValid;

        // Mettre à jour le bouton de soumission
        const submitBtn = formConfig.element.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = !allValid;
            submitBtn.classList.toggle('btn-disabled', !allValid);
        }
    }

    async handleSubmit(formId) {
        const formConfig = this.forms.get(formId);
        if (!formConfig) return;

        // Validation complète avant soumission
        let isFormValid = true;
        for (const [name, fieldConfig] of formConfig.fields) {
            if (!this.validateField(fieldConfig.element)) {
                isFormValid = false;
            }
        }

        if (!isFormValid) {
            this.showFormMessage(formId, 'Veuillez corriger les erreurs avant de soumettre', 'error');
            return;
        }

        // Collecter les données
        const formData = new FormData(formConfig.element);
        const data = Object.fromEntries(formData.entries());

        // Afficher le loading
        this.setFormLoading(formId, true);

        try {
            // Traitement selon le type de formulaire
            await this.processForm(formConfig.type, data);
            this.showFormMessage(formId, 'Message envoyé avec succès!', 'success');
            formConfig.element.reset();
            
            // Émettre événement personnalisé
            document.dispatchEvent(new CustomEvent(window.XtranumerikEvents.FORM_SUBMITTED, {
                detail: { formId, type: formConfig.type, data }
            }));

        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormMessage(formId, 'Une erreur est survenue. Veuillez réessayer.', 'error');
        } finally {
            this.setFormLoading(formId, false);
        }
    }

    async processForm(type, data) {
        switch (type) {
            case 'contact':
                return this.sendContactEmail(data);
            case 'demo':
                return this.sendDemoRequest(data);
            case 'reservation':
                return this.sendReservationRequest(data);
            case 'newsletter':
                return this.subscribeNewsletter(data);
            default:
                throw new Error('Type de formulaire non supporté');
        }
    }

    sendContactEmail(data) {
        // Construire l'email avec les données du formulaire
        const subject = encodeURIComponent(data.subject || 'Contact depuis le site Xtranumerik');
        let body = `Bonjour,%0A%0A`;
        
        if (data.message) {
            body += `Message: ${encodeURIComponent(data.message)}%0A%0A`;
        }
        
        body += `Coordonnées:%0A`;
        body += `- Nom: ${encodeURIComponent(data.name || 'Non spécifié')}%0A`;
        body += `- Email: ${encodeURIComponent(data.email || 'Non spécifié')}%0A`;
        
        if (data.phone) {
            body += `- Téléphone: ${encodeURIComponent(data.phone)}%0A`;
        }
        
        if (data.company) {
            body += `- Entreprise: ${encodeURIComponent(data.company)}%0A`;
        }

        body += `%0ACordialement`;

        const mailto = `mailto:${window.XtranumerikConfig.api.contact}?subject=${subject}&body=${body}`;
        window.location.href = mailto;

        return Promise.resolve();
    }

    sendDemoRequest(data) {
        const subject = encodeURIComponent('Demande de démonstration - Xtranumerik');
        let body = `Bonjour,%0A%0AJe souhaiterais obtenir une démonstration de vos solutions d'affichage dynamique.%0A%0A`;
        
        body += `Informations sur mon entreprise:%0A`;
        body += `- Nom: ${encodeURIComponent(data.name || 'Non spécifié')}%0A`;
        body += `- Entreprise: ${encodeURIComponent(data.company || 'Non spécifié')}%0A`;
        body += `- Email: ${encodeURIComponent(data.email || 'Non spécifié')}%0A`;
        body += `- Téléphone: ${encodeURIComponent(data.phone || 'Non spécifié')}%0A`;
        body += `- Secteur d'activité: ${encodeURIComponent(data.sector || 'Non spécifié')}%0A`;
        
        if (data.message) {
            body += `%0AMessage additionnel:%0A${encodeURIComponent(data.message)}%0A`;
        }
        
        body += `%0AMerci de me contacter pour planifier une démonstration.%0A%0ACordialement`;

        const mailto = `mailto:${window.XtranumerikConfig.api.sales}?subject=${subject}&body=${body}`;
        window.location.href = mailto;

        return Promise.resolve();
    }

    sendReservationRequest(data) {
        const subject = encodeURIComponent(`Réservation espace publicitaire - ${data.location || 'Emplacement à déterminer'}`);
        let body = `Bonjour Patrick,%0A%0AJe souhaiterais réserver un espace publicitaire sur votre réseau.%0A%0A`;
        
        body += `Informations sur ma demande:%0A`;
        body += `- Entreprise: ${encodeURIComponent(data.company || 'Non spécifié')}%0A`;
        body += `- Contact: ${encodeURIComponent(data.name || 'Non spécifié')}%0A`;
        body += `- Email: ${encodeURIComponent(data.email || 'Non spécifié')}%0A`;
        body += `- Téléphone: ${encodeURIComponent(data.phone || 'Non spécifié')}%0A`;
        
        if (data.location) {
            body += `- Emplacement souhaité: ${encodeURIComponent(data.location)}%0A`;
        }
        
        if (data.duration) {
            body += `- Durée de campagne: ${encodeURIComponent(data.duration)}%0A`;
        }
        
        if (data.budget) {
            body += `- Budget approximatif: ${encodeURIComponent(data.budget)}%0A`;
        }
        
        if (data.message) {
            body += `%0AMessage additionnel:%0A${encodeURIComponent(data.message)}%0A`;
        }
        
        body += `%0AMerci de me contacter pour finaliser la réservation.%0A%0ACordialement`;

        const mailto = `mailto:${window.XtranumerikConfig.api.sales}?subject=${subject}&body=${body}`;
        window.location.href = mailto;

        return Promise.resolve();
    }

    subscribeNewsletter(data) {
        // Pour l'instant, rediriger vers email - à remplacer par API newsletter plus tard
        const subject = encodeURIComponent('Inscription newsletter Xtranumerik');
        const body = `Bonjour,%0A%0AJe souhaite m'inscrire à la newsletter Xtranumerik.%0A%0AEmail: ${encodeURIComponent(data.email)}%0A%0AMerci`;

        const mailto = `mailto:${window.XtranumerikConfig.api.contact}?subject=${subject}&body=${body}`;
        window.location.href = mailto;

        return Promise.resolve();
    }

    setFormLoading(formId, isLoading) {
        const formConfig = this.forms.get(formId);
        if (!formConfig) return;

        const form = formConfig.element;
        const submitBtn = form.querySelector('button[type="submit"]');
        
        if (isLoading) {
            form.classList.add('form-loading');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.dataset.originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<span class="loading-spinner">⏳</span> Envoi en cours...';
            }
        } else {
            form.classList.remove('form-loading');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = submitBtn.dataset.originalText || 'Envoyer';
            }
        }
    }

    showFormMessage(formId, message, type = 'info') {
        const formConfig = this.forms.get(formId);
        if (!formConfig) return;

        // Supprimer les messages existants
        const existingMessage = formConfig.element.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Créer le nouveau message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-message-${type}`;
        messageElement.textContent = message;

        // Ajouter avant le bouton de soumission
        const submitBtn = formConfig.element.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.parentNode.insertBefore(messageElement, submitBtn);
        } else {
            formConfig.element.appendChild(messageElement);
        }

        // Auto-masquer après 5 secondes pour les messages de succès
        if (type === 'success') {
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.remove();
                }
            }, 5000);
        }
    }
}

// Styles CSS pour les formulaires (à ajouter dans components.css)
const formStyles = `
.field-valid {
    border-color: #28a745;
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
}

.field-invalid {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.field-error {
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.form-message {
    padding: 0.75rem 1rem;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
    font-weight: 500;
}

.form-message-success {
    background-color: #d1edff;
    border: 1px solid #28a745;
    color: #155724;
}

.form-message-error {
    background-color: #f8d7da;
    border: 1px solid #dc3545;
    color: #721c24;
}

.form-message-info {
    background-color: #cce7ff;
    border: 1px solid #007bff;
    color: #004085;
}

.form-loading {
    opacity: 0.7;
    pointer-events: none;
}

.loading-spinner {
    display: inline-block;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.btn-disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
`;

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    window.xtranumerikForms = new XtranumerikForms();
});

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = XtranumerikForms;
} else {
    window.XtranumerikForms = XtranumerikForms;
}
