import { Controller } from "@hotwired/stimulus";
import { post } from "@rails/request.js";
import { Turbo } from "@hotwired/turbo-rails";

/*
 * Usage
 * =====
 *
 * Add data-controller="toggle-lock" to the button element
 *
 * Add data-toggle-lock-url-value="<%= toggle_lock_status_user_path(@user) %>" to the button
 * Add data-toggle-lock-redirect-value="<%= edit_user_path(@user) %>" to the button
 *
 * Example:
 * <button type="button"
 *         data-controller="toggle-lock"
 *         data-toggle-lock-url-value="<%= toggle_lock_status_user_path(@user) %>"
 *         data-toggle-lock-redirect-value="<%= edit_user_path(@user) %>"
 *         data-action="click->toggle-lock#toggle">
 *   Lock/Unlock account
 * </button>
 */
export default class extends Controller {
  static values = { 
    url: String,
    redirect: String 
  };

  async toggle(event) {
    event.preventDefault();
    event.stopPropagation();

    try {
      // Use turbo-stream response kind to handle Turbo Stream responses
      await post(this.urlValue, {
        responseKind: "turbo-stream"
      });
      // Turbo Stream will automatically update the page and show flash messages
    } catch (error) {
      console.error("Error toggling lock status:", error);
      // Fallback to redirect if Turbo Stream fails
      if (this.hasRedirectValue) {
        Turbo.visit(this.redirectValue);
      }
    }
  }
}
