import { Resend } from 'resend';

export async function POST(request) {
  /* ── Parse body ── */
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  const { name, phone, email, city, projectType, message, fileUrls = [], caslConsent = false } = body;

  /* ── Validate required fields ── */
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name is required (min 2 characters)');
  }
  if (!phone && !email) {
    errors.push('Phone or email is required');
  }
  if (phone && !/^[\d\s\-\+\(\)\.]{7,20}$/.test(phone.trim())) {
    errors.push('Phone format is invalid');
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.push('Email format is invalid');
  }
  if (!projectType) {
    errors.push('Project type is required');
  }
  if (!message || message.trim().length < 5) {
    errors.push('Message is required (min 5 characters)');
  }

  if (errors.length > 0) {
    return Response.json(
      { error: errors.join(', ') },
      { status: 400 }
    );
  }

  /* ── Check env ── */
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return Response.json(
      { error: 'Server configuration error. Please try calling us directly.' },
      { status: 500 }
    );
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || 'J.J.RENOS@hotmail.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

  /* ── Build email HTML ── */
  const projectLabels = {
    kitchen: 'Cuisine / Kitchen',
    bathroom: 'Salle de bain / Bathroom',
    basement: 'Sous-sol / Basement',
    paint: 'Gypse & peinture / Drywall & Painting',
    floor: 'Plancher & céramique / Flooring & Tile',
    carpentry: 'Menuiserie & finition / Carpentry & Finishing',
    commercial: 'Commercial',
    other: 'Autre / Other',
  };

  const projectLabel = projectLabels[projectType] || projectType;
  const now = new Date().toLocaleString('fr-CA', { timeZone: 'America/Montreal' });

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0b1628; padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px;">
          📋 Nouvelle demande de soumission
        </h1>
        <p style="color: #4da3ff; margin: 4px 0 0; font-size: 14px;">
          New quote request — J&J Rénovation
        </p>
      </div>

      <div style="background: #ffffff; padding: 32px; border: 1px solid #e0e6ef; border-top: none;">
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #eee; color: #5a6270; font-weight: 600; width: 140px; vertical-align: top;">
              👤 Nom / Name
            </td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #eee; color: #1a1a2e;">
              ${escapeHtml(name)}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #eee; color: #5a6270; font-weight: 600; vertical-align: top;">
              📞 Téléphone
            </td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #eee; color: #1a1a2e;">
              ${phone ? `<a href="tel:${escapeHtml(phone.replace(/\s/g, ''))}" style="color: #1a73e8;">${escapeHtml(phone)}</a>` : '—'}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #eee; color: #5a6270; font-weight: 600; vertical-align: top;">
              ✉️ Courriel / Email
            </td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #eee; color: #1a1a2e;">
              ${email ? `<a href="mailto:${escapeHtml(email)}" style="color: #1a73e8;">${escapeHtml(email)}</a>` : '—'}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #eee; color: #5a6270; font-weight: 600; vertical-align: top;">
              📍 Ville / City
            </td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #eee; color: #1a1a2e;">
              ${city ? escapeHtml(city) : '—'}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #eee; color: #5a6270; font-weight: 600; vertical-align: top;">
              🔨 Projet / Project
            </td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #eee; color: #1a1a2e; font-weight: 600;">
              ${escapeHtml(projectLabel)}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #eee; color: #5a6270; font-weight: 600; vertical-align: top;">
              💬 Message
            </td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #eee; color: #1a1a2e; white-space: pre-wrap; line-height: 1.6;">
              ${escapeHtml(message)}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #eee; color: #5a6270; font-weight: 600; vertical-align: top;">
              ✅ LCAP / CASL
            </td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #eee; color: #1a1a2e;">
              ${caslConsent ? 'Oui — consentement express / Yes — express consent' : 'Non / No'}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; color: #5a6270; font-weight: 600; vertical-align: top;">
              📎 Fichiers joints / Attached files
            </td>
            <td style="padding: 12px 8px; color: #1a1a2e; line-height: 1.8;">
              ${fileUrls.length > 0
                ? fileUrls.map((url) => `<a href="${escapeHtml(url)}" style="color:#1a73e8; display:block; word-break:break-all;">${escapeHtml(url)}</a>`).join('')
                : 'Aucun / None'}
            </td>
          </tr>
        </table>
      </div>

      <div style="background: #f1f4f8; padding: 16px 32px; border-radius: 0 0 12px 12px; border: 1px solid #e0e6ef; border-top: none;">
        <p style="margin: 0; font-size: 12px; color: #5a6270;">
          Envoyé le ${now} via le site web J&J Rénovation
        </p>
      </div>
    </div>
  `;

  /* ── Send via Resend ── */
  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: `J&J Rénovation <${fromEmail}>`,
      to: [toEmail],
      replyTo: email ? email.trim() : undefined,
      subject: `🔨 Soumission: ${escapeHtml(projectLabel)} — ${escapeHtml(name)}`,
      html: htmlBody,
    });

    if (error) {
      console.error('Resend API error:', error);
      return Response.json(
        { error: 'Failed to send email. Please try calling us at (263) 382-4336.' },
        { status: 500 }
      );
    }

    return Response.json(
      { success: true, id: data?.id },
      { status: 200 }
    );
  } catch (err) {
    console.error('Unexpected error sending email:', err);
    return Response.json(
      { error: 'Unexpected error. Please try calling us at (263) 382-4336.' },
      { status: 500 }
    );
  }
}

/* ── HTML escape helper ── */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
