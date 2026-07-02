export function NetlifyFormsHidden() {
  return (
    <div hidden aria-hidden="true">
      <form name="lead" data-netlify="true" data-netlify-honeypot="bot-field">
        <input name="type" />
        <input name="area" />
        <input name="location" />
        <input name="date" />
        <input name="name" />
        <input name="phone" />
        <input name="email" />
        <input name="rodo" />
      </form>
      <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field">
        <input name="name" />
        <input name="phone" />
        <input name="email" />
        <textarea name="message"></textarea>
        <input name="rodo" />
      </form>
      <form name="exit-intent" data-netlify="true" data-netlify-honeypot="bot-field">
        <input name="contact" />
        <input name="rodo" />
      </form>
    </div>
  );
}
