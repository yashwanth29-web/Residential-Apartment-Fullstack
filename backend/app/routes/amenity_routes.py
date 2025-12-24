from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.amenity import Amenity
from app.models.user import User
from app.models.tower import Tower

amenity_bp = Blueprint("amenity", __name__)

# ---------- ADMIN: CREATE AMENITY ----------
@amenity_bp.route("/api/admin/amenities", methods=["POST"])
@jwt_required()
def create_amenity():
    user = User.query.get(int(get_jwt_identity()))
    if user.role != "admin":
        return jsonify({"message": "Admin only"}), 403
    

    data = request.json
    tower_id = data.get("tower_id")
    tower = Tower.query.get(tower_id)
    if not tower:
        
        return jsonify({"message": "Tower not found"}), 404

    amenity = Amenity(
        name=data["name"],
        description=data["description"],
        image=data["image"],
        tower_id=data["tower_id"]
    )
    db.session.add(amenity)
    db.session.commit()
    return jsonify({"message": "Amenity added"})


# ---------- ADMIN: GET ALL ----------
@amenity_bp.route("/api/admin/amenities", methods=["GET"])
@jwt_required()
def get_admin_amenities():
    amenities = Amenity.query.all()
    return jsonify([
        {
            "id": a.id,
            "name": a.name,
            "description": a.description,
            "image": a.image,
            "tower_id": a.tower_id
        } for a in amenities
    ])


# ---------- RESIDENT: GET AMENITIES ----------
@amenity_bp.route("/api/amenities", methods=["GET"])
@jwt_required()
def get_amenities():
    amenities = Amenity.query.all()
    return jsonify([
        {
            "id": a.id,
            "name": a.name,
            "description": a.description,
            "image": a.image,
            "tower_id": a.tower_id
        } for a in amenities
    ])
# ---------- ADMIN: UPDATE AMENITY ----------
@amenity_bp.route("/api/admin/amenities/<int:id>", methods=["PUT"])
@jwt_required()
def update_amenity(id):
    user = User.query.get(int(get_jwt_identity()))
    if user.role != "admin":
        return jsonify({"message": "Admin only"}), 403

    amenity = Amenity.query.get(id)
    if not amenity:
        return jsonify({"message": "Amenity not found"}), 404

    data = request.json
    amenity.name = data.get("name", amenity.name)
    amenity.description = data.get("description", amenity.description)
    amenity.image = data.get("image", amenity.image)
    amenity.tower_id = data.get("tower_id", amenity.tower_id)

    db.session.commit()
    return jsonify({"message": "Amenity updated"})


# ---------- ADMIN: DELETE AMENITY ----------
@amenity_bp.route("/api/admin/amenities/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_amenity(id):
    user = User.query.get(int(get_jwt_identity()))
    if user.role != "admin":
        return jsonify({"message": "Admin only"}), 403

    amenity = Amenity.query.get(id)
    if not amenity:
        return jsonify({"message": "Amenity not found"}), 404

    db.session.delete(amenity)
    db.session.commit()
    return jsonify({"message": "Amenity deleted"})

