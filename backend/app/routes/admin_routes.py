from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.user import User
from app.models.booking import Booking
from app.models.unit import Unit
from app.models.tower import Tower


admin_bp = Blueprint("admin", __name__, url_prefix="/api/admin")

# Create tower endpoint moved to `app.routes.towers` (tower_bp)


# ---------------------------
# GET ALL BOOKINGS (ADMIN)
# ---------------------------

# ---------------------------
# APPROVE / REJECT BOOKING
# ---------------------------
@admin_bp.route("/bookings/<int:id>", methods=["PUT"])
@jwt_required()
def update_booking_status(id):
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))

    if not user or user.role != "admin":
        return jsonify({"message": "Admin access required"}), 403

    booking = Booking.query.get(id)
    if not booking:
        return jsonify({"message": "Booking not found"}), 404

    status = request.json.get("status")
    if status not in ["approved", "rejected"]:
        return jsonify({"message": "Invalid status"}), 400

    booking.status = status

    # 🔑 IMPORTANT BUSINESS LOGIC
    unit = Unit.query.get(booking.unit_id)
    if status == "approved":
        unit.status = "occupied"
    else:
        unit.status = "available"

    db.session.commit()

    return jsonify({"message": "Booking updated successfully"})

@admin_bp.route("/dashboard", methods=["GET"])
@jwt_required()
def admin_dashboard():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))

    if not user or user.role != "admin":
        return jsonify({"message": "Admin access required"}), 403

    total_towers = Tower.query.count()
    total_units = Unit.query.count()
    occupied_units = Unit.query.filter_by(status="occupied").count()
    pending_bookings = Booking.query.filter_by(status="pending").count()

    return jsonify({
        "totalTowers": total_towers,
        "totalUnits": total_units,
        "occupiedUnits": occupied_units,
        "pendingBookings": pending_bookings
    })

