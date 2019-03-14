import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class MyTimePicker extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          padding: 10px;
        }
      </style>

      <vaadin-select id="theTimePicker" label="{{inputLabel}}" value="{{timeValue}}">
        <template>
          <vaadin-list-box>
            <vaadin-item value="00:00">12:00 AM</vaadin-item>
            <vaadin-item value="00:30">12:30 AM</vaadin-item>
            <vaadin-item value="01:00">1:00 AM</vaadin-item>
            <vaadin-item value="01:30">1:30 AM</vaadin-item>
            <vaadin-item value="02:00">2:00 AM</vaadin-item>
            <vaadin-item value="02:30">2:30 AM</vaadin-item>
            <vaadin-item value="03:00">3:00 AM</vaadin-item>
            <vaadin-item value="03:30">3:30 AM</vaadin-item>
            <vaadin-item value="04:00">4:00 AM</vaadin-item>
            <vaadin-item value="04:30">4:30 AM</vaadin-item>
            <vaadin-item value="05:00">5:00 AM</vaadin-item>
            <vaadin-item value="05:30">5:30 AM</vaadin-item>
            <vaadin-item value="06:00">6:00 AM</vaadin-item>
            <vaadin-item value="06:30">6:30 AM</vaadin-item>
            <vaadin-item value="07:00">7:00 AM</vaadin-item>
            <vaadin-item value="07:30">7:30 AM</vaadin-item>
            <vaadin-item value="08:00">8:00 AM</vaadin-item>
            <vaadin-item value="08:30">8:30 AM</vaadin-item>
            <vaadin-item value="09:00">9:00 AM</vaadin-item>
            <vaadin-item value="09:30">9:30 AM</vaadin-item>
            <vaadin-item value="10:00">10:00 AM</vaadin-item>
            <vaadin-item value="10:30">10:30 AM</vaadin-item>
            <vaadin-item value="11:00">11:00 AM</vaadin-item>
            <vaadin-item value="11:30">11:30 AM</vaadin-item>
            <vaadin-item value="12:00">12:00 PM</vaadin-item>
            <vaadin-item value="12:30">12:30 PM</vaadin-item>
            <vaadin-item value="13:00">1:00 PM</vaadin-item>
            <vaadin-item value="13:30">1:30 PM</vaadin-item>
            <vaadin-item value="14:00">2:00 PM</vaadin-item>
            <vaadin-item value="14:30">2:30 PM</vaadin-item>
            <vaadin-item value="15:00">3:00 PM</vaadin-item>
            <vaadin-item value="15:30">3:30 PM</vaadin-item>
            <vaadin-item value="16:00">4:00 PM</vaadin-item>
            <vaadin-item value="16:30">4:30 PM</vaadin-item>
            <vaadin-item value="17:00">5:00 PM</vaadin-item>
            <vaadin-item value="17:30">5:30 PM</vaadin-item>
            <vaadin-item value="18:00">6:00 PM</vaadin-item>
            <vaadin-item value="18:30">6:30 PM</vaadin-item>
            <vaadin-item value="19:00">7:00 PM</vaadin-item>
            <vaadin-item value="19:30">7:30 PM</vaadin-item>
            <vaadin-item value="20:00">8:00 PM</vaadin-item>
            <vaadin-item value="20:30">8:30 PM</vaadin-item>
            <vaadin-item value="21:00">9:00 PM</vaadin-item>
            <vaadin-item value="21:30">9:30 PM</vaadin-item>
            <vaadin-item value="22:00">10:00 PM</vaadin-item>
            <vaadin-item value="22:30">10:30 PM</vaadin-item>
            <vaadin-item value="23:00">11:00 PM</vaadin-item>
            <vaadin-item value="23:30">11:30 PM</vaadin-item>
          </vaadin-list-box>
        </template>
      </vaadin-select>
    `;
  }

  static get properties() {
    return {
      timeValue: {
        type: String,
        value: "06:00"
      },
      inputLabel: {
        type: String,
        value: "Select Time"
      }
    }
  }

  ready() {
    super.ready();

    // console.log("time picker is ready");
    this.$.theTimePicker.addEventListener('value-changed', this.handleValueChanged.bind(this));
  }

  handleValueChanged(event) {
    // console.log("handleValueChanged. event = ", event);
    // console.log('event.detail.value = ', event.detail.value);
    let theTimeValue = this.$.theTimePicker.value;
    console.log('this.$.theTimePicker.value = ', theTimeValue);   
    this.timeValue = theTimeValue;

    // console.log("firing timepicker-value-changed custom event");
    this.dispatchEvent(new CustomEvent('timepicker-value-changed', {detail: {value: theTimeValue}}));
  }
}

window.customElements.define('my-time-picker', MyTimePicker);