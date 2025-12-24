from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.lease import Lease
from app.models.unit import Unit
from app.models.user import User
from datetime import date

lease_bp = Blueprint("lease", __name__, url_prefix="/api/admin/leases")

# ---------------- CREATE LEASE ----------------
@lease_bp.route("", methods=["POST"])
@jwt_required()
def create_lease():
    admin = User.query.get(int(get_jwt_identity()))
    if admin.role != "admin":
        return jsonify({"message": "Admin only"}), 403

    data = request.json

    lease = Lease(
        user_id=data["user_id"],
        unit_id=data["unit_id"],
        user_name=data.get("user_name"),
        start_date=date.today()
    )

    # mark unit occupied
    unit = Unit.query.get(data["unit_id"])
    unit.status = "occupied"

    db.session.add(lease)
    db.session.commit()

    return jsonify({"message": "Lease created successfully"})


# ---------------- GET ALL LEASES ----------------
@lease_bp.route("", methods=["GET"])
@jwt_required()
def get_leases():
    admin = User.query.get(int(get_jwt_identity()))
    if admin.role != "admin":
        return jsonify({"message": "Admin only"}), 403

    leases = Lease.query.all()
    return jsonify([
        {
            "id": l.id,
            "user_id": l.user_id,
            "user_name": l.user_name,
            "unit_id": l.unit_id,
            "start_date": l.start_date.isoformat()
        } for l in leases
    ])


# ---------------- UPDATE LEASE ----------------
@lease_bp.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_lease(id):
    admin = User.query.get(int(get_jwt_identity()))
    if admin.role != "admin":
        return jsonify({"message": "Admin only"}), 403

    lease = Lease.query.get(id)
    if not lease:
        return jsonify({"message": "Lease not found"}), 404

    data = request.json
    lease.user_name = data.get("user_name", lease.user_name)

    db.session.commit()
    return jsonify({"message": "Lease updated"})


# ---------------- DELETE LEASE ----------------
@lease_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_lease(id):
    admin = User.query.get(int(get_jwt_identity()))
    if admin.role != "admin":
        return jsonify({"message": "Admin only"}), 403

    lease = Lease.query.get(id)
    if not lease:
        return jsonify({"message": "Lease not found"}), 404

    # free the unit
    unit = Unit.query.get(lease.unit_id)
    unit.status = "available"

    db.session.delete(lease)
    db.session.commit()

    return jsonify({"message": "Lease deleted"})
